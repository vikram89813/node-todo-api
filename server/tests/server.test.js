const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');
const {User} = require('./../models/user');

const {todos,populateTodos,users,populateUsers} = require('./seed/seed');
// to empty db before testing.
// runs before testing.
beforeEach(populateTodos);
beforeEach(populateUsers);

describe('POST /todos',()=>{
    it('should create a new todo', (done)=>{
        var text = 'Test todo text';
        request(app)
        .post('/todos')
        .set('x-auth',users[0].tokens[0].token)
        .send({
            text
        })
        .expect(200)
        .expect((res)=>{
            expect(res.body.text).toBe(text);
        }).end((err,res)=>{
            if(err) {
                return done(err);
            }
            Todo.find({text}).then((todos)=>{
                expect(todos.length).toBe(1);
                expect(todos[0].text).toBe(text);
                done();
            }).catch((err)=>{
                return done(err);
            });
        });
    });

    it('Should not create todo with invalid body data',(done)=>{
        request(app)
        .post('/todos')
        .set('x-auth',users[0].tokens[0].token)
        .send({})
        .expect(400)
        .end((err,res)=>{
            if(err) {
                return done(err);
            }
            Todo.find().then((todos)=>{
                expect(todos.length).toBe(2);
                done();
            }).catch((e)=>done(e));
        });
    });
});

describe('GET /todos',()=>{
    it('Should get all todos', (done)=>{
        request(app)
        .get('/todos')
        .set('x-auth',users[0].tokens[0].token)
        .expect(200)
        .expect((res)=>{
            expect(res.body.todos.length).toBe(1);
        }).end(done);
    });
});

describe('GET /todos/id',()=>{
    it('Should return todo doc',(done)=>{
        request(app)
        .get(`/todos/${todos[0]._id.toHexString()}`)
        .set('x-auth',users[0].tokens[0].token)
        .expect(200)
        .expect((res)=>{
            expect(res.body.todo.text).toBe(todos[0].text);
        }).end(done);
    });

    it('Should return todo doc created by otyher user',(done)=>{
        request(app)
        .get(`/todos/${todos[1]._id.toHexString()}`)
        .set('x-auth',users[0].tokens[0].token)
        .expect(404)
        .end(done);
    });

    it('Should return a 404 if todo not found',(done)=>{
        var hexId = new ObjectID().toHexString();

        request(app).get(`/todos/${hexId}`)
        .set('x-auth',users[0].tokens[0].token)
        .expect(404)
        .end(done);
    });

    it('Should return 404 for non-object ids',(done)=>{
        request(app)
        .get('/todos/123abc')
        .set('x-auth',users[0].tokens[0].token)
        .expect(404)
        .end(done);
    });
});

describe('DELETE /todos/:id',()=>{
    it('Should remove a todo', (done)=>{
        var hexID = todos[1]._id.toHexString();
        request(app)
            .delete(`/todos/${hexID}`)
            .set('x-auth',users[1].tokens[0].token)
            .expect(200)
            .expect((res)=>{
                expect(res.body.todo._id).toBe(hexID);
            })
            .end((err,res)=>{
                if(err) {
                    return done(err);
                }
                Todo.findById(hexID).then((todo)=>{
                    expect(todo).toBeFalsy();
                    done();
                }).catch((e)=> done(e));
            });
    });

    it('Should not remove a todo', (done)=>{
        var hexID = todos[0]._id.toHexString();
        request(app)
            .delete(`/todos/${hexID}`)
            .set('x-auth',users[1].tokens[0].token)
            .expect(404)
            .end((err,res)=>{
                if(err) {
                    return done(err);
                }
                Todo.findById(hexID).then((todo)=>{
                    expect(todo).toBeTruthy();
                    done();
                }).catch((e)=> done(e));
            });
    });

    it('Should return 404 if a todo not found', (done)=>{
        var hexId = new ObjectID().toHexString();

        request(app)
        .delete(`/todos/${hexId}`)
        .set('x-auth',users[1].tokens[0].token)
        .expect(404)
        .end(done);
    });

    it('Should return 404 if object id  is invalid', (done)=>{
        request(app)
        .delete('/todos/123abc')
        .set('x-auth',users[1].tokens[0].token)
        .expect(404)
        .end(done);
    });
});

describe('PATCH /todos/:id',()=>{
    it('Should update the todo',(done)=>{
        var hexID = todos[0]._id.toHexString();
        var text = 'This should be bew text';
        request(app)
        .patch(`/todos/${hexID}`)
        .set('x-auth',users[0].tokens[0].token)
        .send({
            completed:true,
            text
        })
        .expect(200)
        .expect((res)=>{
            expect(res.body.todo.text).toBe(text);
            expect(res.body.todo.completed).toBe(true);
            expect(typeof res.body.todo.completedAt).toBe('number');
        })
        .end(done);
    });

    it('Should not update the todo creted by other user',(done)=>{
        var hexID = todos[0]._id.toHexString();
        var text = 'This should be bew text';
        request(app)
        .patch(`/todos/${hexID}`)
        .set('x-auth',users[1].tokens[0].token)
        .send({
            completed:true,
            text
        })
        .expect(404)
        .end(done);
    });

    it('Should clear completedAt when todo is not completed',(done)=>{
        var hexID = todos[1]._id.toHexString();
        var text = 'This should be new text!!';
        request(app)
        .patch(`/todos/${hexID}`)
        .set('x-auth',users[1].tokens[0].token)
        .send({
            completed:false,
            text
        })
        .expect(200)
        .expect((res)=>{
            expect(res.body.todo.text).toBe(text);
            expect(res.body.todo.completed).toBe(false);
            expect(res.body.todo.completedAt).toBeFalsy();
        })
        .end(done);
    });
});

describe('GET /users/me',()=>{
    it('should return user if authenticated',(done)=>{
        request(app)
        .get('/users/me')
        .set('x-auth',users[0].tokens[0].token)
        .expect(200)
        .expect((res)=>{
            expect(res.body._id).toBe(users[0]._id.toHexString());
            expect(res.body.email).toBe(users[0].email);
        })
        .end(done);
    });
    it('should return 401 if not authenticated',(done)=>{
        request(app)
        .get('/users/me')
        .expect(401)
        .expect((res)=>{
            expect(res.body).toEqual({});
        })
        .end(done);
    });
});

describe('POST /users',()=>{
    it('should create a user',(done)=>{
        var email = 'test3@test.com';
        var password = "123dggefe";

        request(app)
        .post('/users')
        .send({email,password})
        .expect(200)
        .expect((res)=>{
            expect(res.header['x-auth']).toBeTruthy();
            expect(res.body._id).toBeTruthy();;
            expect(res.body.email).toBe(email);
        })
        .end((err)=>{
            if(err){
                return done(err);
            }
            User.findOne({email}).then((user)=>{
                expect(user).toBeTruthy();
                expect(user.password).not.toBe(password);
                done();
            })
            .catch((e)=>done(e));
        });
    });

    it('should return validation error if request invalid',(done)=>{
        request(app)
        .post('/users')
        .send({
            email: 'and',
            password: '123'
        })
        .expect(400)
        .end(done);
    });

    it('should not create user if email already in use',(done)=>{
        request(app)
        .post('/users')
        .send({
            email: users[0].email,
            password: users[0].password
        })
        .expect(400)
        .end(done);
    });
});

describe('POST /users/login',()=>{
    it('should login user and return auth token',(done)=>{
        request(app)
        .post('/users/login')
        .send({
            email: users[1].email,
            password: users[1].password
        })
        .expect(200)
        .expect((res)=>{
            expect(res.header['x-auth']).toBeTruthy();
        }).end((err,res)=>{
            if(err) {
                return done(err);
            }
            User.findById(users[1]._id)
            .then((user)=>{
                expect(user.toObject().tokens[1]).toMatchObject({
                    access: 'auth',
                    token: res.header['x-auth']
                });
                done();
            })
            .catch((e)=>{
                return done(e);
            });
        });
    });
    it('should reject invalid login',(done)=>{
        request(app)
        .post('/users/login')
        .send({
            email: users[1].email,
            password: 'abcdefhjkj'
        })
        .expect(400)
        .expect((res)=>{
            expect(res.header['x-auth']).toBeFalsy();
        }).end((err,res)=>{
            if(err) {
                return done(err);
            }
            User.findById(users[1]._id)
            .then((user)=>{
                expect(user.tokens.length).toBe(1);
                done();
            })
            .catch((e)=>{
                return done(e);
            });
        });
    });
});

describe('DELETE /users/me/token',()=>{
    it('should delete auth token on logout',(done)=>{
        request(app)
        .delete('/users/me/token')
        .set('x-auth',users[0].tokens[0].token)
        .expect(200)
        .end((err,res)=>{
            if(err) {
                return done(err);
            }
            User.findById(users[0]._id)
            .then((user)=>{
                expect(user.tokens.length).toBe(0);
                done();
            })
            .catch((e)=>done(e));
        });
    });
});