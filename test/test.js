var sinon = require('sinon');
var chai = require('chai');
var expect = chai.expect;

var mongoose = require('mongoose');
require('sinon-mongoose');

//Importing our todo model for our unit testing.
var Todo = require('../model/todo.model');

describe("Get all todos", function(){
    //test will pass if return all todos
    it("should return all todos", function(done){
        var TodoMock = sinon.mock(Todo);
        var expectResult = {status:true, todo:[]};
        TodoMock.expects('find').yields(null, expectResult);
        Todo.find(function(err, result){
            TodoMock.verify();
            TodoMock.restore();
            expect(result.status).to.be.true;
            done();
        });
    });

    it("Should return error", function(done){
        var TodoMock = sinon.mock(Todo);
        var expectResult = {status:false, error:'Something went wrong'};
        TodoMock.expects('find').yields(expectResult, null);
        Todo.find(function(err, result){
            TodoMock.verify();
            TodoMock.restore();
            expect(err.status).to.not.be.true;
            done();
        });
    });
});

//Test will pass if the todo is saved
describe("Post a new todo", function(){
    it("Should create a new todo", function(done){
        var TodoMock = sinon.mock(Todo({todo:'Save new todo from mock'}));
        var todo = TodoMock.object;
        var expectResult={status:true};
        TodoMock.expects('save').yields(null, expectResult);
        todo.save(function(err, result){
            TodoMock.verify();
            TodoMock.restore();
            expect(result.status).to.be.true;
            done();
        });
    });
    it("should return error, if post not saved", function(done){
        var TodoMock = sinon.mock(Todo({todo:"save new todo from mock"}));
        var todo =TodoMock.object;
        var expectResult = {status:false};

        TodoMock.expects('save').yields(expectResult, null);
        todo.save(function(err, result){
            TodoMock.verify();
            TodoMock.restore();
            expect(err.status).to.not.be.true;
            done();
        })
    })
});

describe("Update new todo by id", function(){
    it("Should update todo by id", function(done){
        var TodoMock = sinon.mock(new Todo({complete:true}));
        var todo = TodoMock.object;
        var expectResult = {status:true};
        TodoMock.expects('save').withArgs({_id:12345, }).yields(null, expectResult);
        todo.save({_id: 12345},function(err, result){
            TodoMock.verify();
            TodoMock.restore();
            expect(result.status).to.be.true;
            done();
        });
    });
    it("Should return error if update action is failed", function(done){
        var TodoMock = sinon.mock(new Todo({complete:true}));
        var todo = TodoMock.object;
        var expectResult = {status:false};
        TodoMock.expects('save').withArgs({_id:12345}).yields(expectResult, null);
        todo.save({_id: 12345},function(err, result){
            TodoMock.verify();
            TodoMock.restore();
            expect(err.status).to.not.be.true;
            done();
        });
    });
});

describe("Delete todo by Id", function(){
    if("Should be delete a todo by id", function(done){
        var TodoMock =sinon.mock(Todo);
        var expectResult = {status:true};
        TodoMock.expects('remove').withArgs({_id:12345}).yields(null, expectResult);
        Todo.remove({_id:12345}, function(err, result){
            TodoMock.verify();
            TodoMock.restore();
            expect(result.status).to.be.true;
            done();
        });
    });
    it("Should return error if delete action is failed", function(done){
        var TodoMock = sinon.mock(Todo);
        var expectResult = {status:false};
        TodoMock.expects('remove').withArgs({_id:12345}).yields(expectResult, null);
        Todo.remove({_id:12345}, function(err, result){
            TodoMock.verify();
            TodoMock.restore();
            expect(err.status).to.not.be.true;
            done();
        });
    });
});