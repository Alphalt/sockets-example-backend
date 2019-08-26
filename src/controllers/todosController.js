var Todos = require('../models/todosModel');

module.exports = (io) => {
    io.on("connection", socket => {
        let previousId;
        const safeJoin = currentId => {
            socket.leave(previousId);
            socket.join(currentId);
            previousId = currentId;
        };

        socket.on("getTodo", todoId => {
            safeJoin(todoId);
            Todos.findById(todoId, (err, todo) => {
                if (err) socket.emit("error", err);
                socket.emit("todo", todo);
            });
        });

        socket.on("createTodo", todo => {
            var new_todo = new Todos(todo);
            new_todo.save((err, todo) => {
                if (err) socket.emit("error", err);
                safeJoin(todo.todoId);
                socket.emit("todo", todo);
            });
        });

        socket.on("editTodo", todo => {
            Todos.findOneAndUpdate({ _id: todo.todoId }, todo, { new: true }, function (err, todo) {
                if (err) socket.emit("error", err);
                socket.emit("todo", todo);
            });
        });

        socket.on("deleteTodo", todoId => {
            Task.remove({ _id: todoId }, function (err, task) {
                if (err) socket.emit("error", err);
                socket.emit("success", 'Todo correctamente eliminado');
            });
        });

        socket.on("cosa", () => {
            socket.emit("success", "Evento de prueba");
        });

        Todos.find({}, function (err, todos) {
            if (err) io.emit("error", err);
            io.emit("Todos", todos);
        });
    });
}

