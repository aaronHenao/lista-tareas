from flask import Flask, render_template, jsonify, request

app = Flask(__name__)

# Lista en memoria para almacenar las tareas
tasks = []

# Ruta para servir la página principal
@app.route('/')
def index():
    return render_template('index.html')

# Ruta para obtener todas las tareas
@app.route('/tasks', methods=['GET'])
def get_tasks():
    return jsonify(tasks)

# Ruta para agregar una nueva tarea
@app.route('/tasks', methods=['POST'])
def add_task():
    data = request.json
    new_task = {'id': len(tasks) + 1, 'task': data['task'], 'completed': False}
    tasks.append(new_task)
    return jsonify(new_task), 201

# Ruta para actualizar el estado de una tarea
@app.route('/tasks/<int:task_id>', methods=['PUT'])
def update_task(task_id):
    for task in tasks:
        if task['id'] == task_id:
            task['completed'] = not task['completed']
            return jsonify(task)
    return jsonify({'error': 'Task not found'}), 404

# Ruta para eliminar una tarea
@app.route('/tasks/<int:task_id>', methods=['DELETE'])
def delete_task(task_id):
    global tasks
    tasks = [task for task in tasks if task['id'] != task_id]
    return jsonify({'result': 'Task deleted'})

if __name__ == '__main__':
    app.run(debug=True)