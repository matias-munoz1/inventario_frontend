import { shallowMount } from '@vue/test-utils'
import TaskList from '@/components/TaskList.vue'
import axios from 'axios'
import types from '@/types.js'

// Mocking axios
jest.mock('axios')

describe('TaskList.vue', () => {
  it('renders tasks correctly', async () => {
    // Datos de ejemplo para las tareas
    const tasks = [
      { id: 1, title: 'Task 1', description: 'Description 1', status: true },
      { id: 2, title: 'Task 2', description: 'Description 2', status: false },
    ]

    // Simulación de la respuesta de axios get
    axios.get.mockResolvedValue({ data: tasks })

    const wrapper = shallowMount(TaskList, {
      props: {
        isDarkTheme: false,
      },
    })

    // Espera a que todas las promesas se resuelvan
    await wrapper.vm.$nextTick()

    // Verificar que las tareas se renderizan correctamente
    const taskRows = wrapper.findAll('tbody tr')
    expect(taskRows.length).toBe(tasks.length)

    // Verificar contenido de la primera fila
    const firstRowCells = taskRows.at(0).findAll('td')
    expect(firstRowCells.at(0).text()).toBe(tasks[0].id.toString())
    expect(firstRowCells.at(1).text()).toBe(tasks[0].title)
    expect(firstRowCells.at(2).text()).toBe(tasks[0].description)
    expect(firstRowCells.at(3).text().trim()).toBe(types.STATUS_COMPLETE)

    // Verificar contenido de la segunda fila
    const secondRowCells = taskRows.at(1).findAll('td')
    expect(secondRowCells.at(0).text()).toBe(tasks[1].id.toString())
    expect(secondRowCells.at(1).text()).toBe(tasks[1].title)
    expect(secondRowCells.at(2).text()).toBe(tasks[1].description)
    expect(secondRowCells.at(3).text().trim()).toBe(types.STATUS_NO_COMPLETE)
  })
})
