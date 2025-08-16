
import { createTheme, Divider, MantineProvider } from '@mantine/core'
import '@mantine/core/styles.css'
import '@mantine/carousel/styles.css'
import '@mantine/dates/styles.css'
import '@mantine/tiptap/styles.css'
import '@mantine/notifications/styles.css'
import './App.css'
import HomePage from './Component/Pages/HomePage'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import FindJobs from './Component/Pages/FindJobs'
import Header from './Component/Header/Header'
import Footer from './Component/LandingPage/Footer'
import FindTalent from './Component/Pages/FindTalent'
import TalentProfile from './Component/Pages/TalentProfile'
import PostJob from './Component/Pages/PostJob'
import JobDescPage from './Component/Pages/JobDescPage'
import ApplyJob from './Component/Pages/ApplyJob'
import CompanyPage from './Component/Pages/CompanyPage'
import PostedJobPage from './Component/Pages/PostedJobPage'
import JobHistory from './Component/Pages/JobHistory'
import SignUpPage from './Component/Pages/SignUpPage'
import ProfilePage from './Component/Pages/ProfilePage'
import { Notifications } from '@mantine/notifications'
import { Provider } from 'react-redux'
import Store from './Component/Store/Store'

function App() {
 const theme=createTheme({
  primaryColor:'sun',
  primaryShade:4,
  colors:{
    'mineShaft':[
          '#f6f6f6','#e7e7e7','#d1d1d1','#b0b0b0','#888888','#6d6d6d','#5d5d5d','#4f4f4f','#454545','#3d3d3d','#0d0d0d',],
    'sun':[
          '#fffbeb','#fff3c6','#ffe588','#ffd149','#03C988','#f99b07','#dd7302','#b75006','#943c0c','#7a330d','#461902',    ]
  }
 })
    
  return (
    <div className='bg-[#000]'>
    <Provider store={Store}>
      <MantineProvider defaultColorScheme="dark" theme={theme}>
        <Notifications position="top-center" zIndex={1000}/>
        <BrowserRouter>
        <div className='relative'>
        <Header/>
         <Divider size="xs" mx={'xm'} color='grey'/>
        <Routes>
          <Route path='/' element={<SignUpPage/>}/>
          <Route path='/home' element={<HomePage/>}/>
          <Route path='/signup' element={<SignUpPage/>}/>
          <Route path='/login' element={<SignUpPage/>}/>
          <Route path='/find-jobs' element={<FindJobs/>}/>
          <Route path='/find-talent' element={<FindTalent/>}/>
          <Route path='/apply/:id' element={<ApplyJob/>}/>
          <Route path='/company/:id' element={<CompanyPage/>}/>
          <Route path='/postedJob/:id' element={<PostedJobPage/>}/>
           <Route path='/job-history' element={<JobHistory/>}/>
          <Route path='/jobs/:id' element={<JobDescPage/>}/>
          <Route path='/talent-profile/:id' element={<TalentProfile/>}/>
          <Route path='/post-job/:id' element={<PostJob/>}/>
          <Route path='/upload-job' element={<HomePage/>}/>
          <Route path='/about' element={<HomePage/>}/>
          <Route path='/profile' element={<ProfilePage/>}/>
        </Routes>
        <Footer/>
        </div>
        </BrowserRouter>
      </MantineProvider>
    </Provider>
    </div>
  )
}

export default App
