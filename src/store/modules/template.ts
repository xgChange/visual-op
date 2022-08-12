/**
 * @description vuex的user模块
 */
import { Module, VuexModule, Action, Mutation, getModule } from 'vuex-module-decorators'
import store from '../index'
import { ComJsonData } from '@/subpage/utils/index'

export interface MyTemplate {
  templateData: ComJsonData
}

@Module({ name: 'template', store, dynamic: true, namespaced: true })
class Template extends VuexModule {
  templateData = {}

  @Mutation
  private SET_TEMPLATE_DATA(templateData: ComJsonData) {
    this.templateData = templateData
  }

  @Action
  setTemplateData(templateData: ComJsonData) {
    this.SET_TEMPLATE_DATA(templateData)
  }
}

export const TemplateModule = getModule(Template)
