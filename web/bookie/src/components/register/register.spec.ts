import { spy, assert } from 'sinon'
import { expect } from 'chai'
import Component from 'vue-class-component'
import { ComponentTest, MockLogger } from '../../util/component-test'
import { RegisterComponent } from './register'

let loggerSpy = spy()

@Component({
  template: require('./register.html')
})
class MockAboutComponent extends RegisterComponent {
  constructor () {
    super()
  }
}

describe('About component', () => {
  let directiveTest: ComponentTest

  beforeEach(() => {
    directiveTest = new ComponentTest('<div><about></about></div>', { 'about': MockAboutComponent })
  })

  it('should render correct contents', async () => {
    debugger
    directiveTest.createComponent()

    await directiveTest.execute((vm) => {
      expect(vm.$el.querySelector('.repo-link').getAttribute('href')).to.equal('https://github.com/ducksoupdev/vue-webpack-typescript')
      assert.calledWith(loggerSpy, 'about is ready!')
    })
  })
})
