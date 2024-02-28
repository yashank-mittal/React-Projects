import './App.css'
import FooterComponent from './components/FooterComponent'
import HeaderComponent from './components/HeaderComponent'
import ListStudentComponent from './components/ListStudentComponent'
import {BrowserRouter, Routes , Route}  from 'react-router-dom'
import StudentComponent from './components/StudentComponent'
import ViewStudent from './components/ViewStudent'

function App() {
  
  return (
    <>
      <BrowserRouter>
        <HeaderComponent />
        <Routes>
          {/* http://localhost:3000 */}
          <Route path='/' element = {<ListStudentComponent />}></Route>
          {/* http://localhost:3000/students */} 
          <Route path='/students' element = {<ListStudentComponent />}></Route>
          {/* http://localhost:3000/addStudent */}
          <Route path='/addStudent' element = {<StudentComponent />}></Route>
          {/* http://localhost:3000/students/updateStudent/1 */}
          <Route path='/students/updateStudent/:id' element = {<StudentComponent />}></Route>
          {/* http://localhost:3000/viewStudent/1 */}
          <Route path='/viewStudent/:id' element = {<ViewStudent />}></Route>
        </Routes>
        <FooterComponent />
      </BrowserRouter>
    </>
  )
}

export default App
