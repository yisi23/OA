import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import courses from '@/components/courses'
import courseDetail from '@/components/courseDetail'
import entryForm from '@/components/entryForm'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/courses',
      name: 'courses',
      component: courses
    },
    {
      path: '/course/:id',
      name: 'course',
      component: courseDetail
    },
    {
      path: '/course/:id/entryForm',
      name: 'entryForm',
      component: entryForm
    }
  ]
})
