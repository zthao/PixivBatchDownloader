import { EVT } from './EVT'
import { lang } from './Lang'

// 快速下载按钮
// 只负责触发快速下载事件，不负责后续的业务逻辑
// 当在无刷新切换的页面里使用快速下载时（监听了 QuickDownload 事件），记得在切换页面时解除事件监听，避免造成重复监听
class QuickDownloadBtn {
  constructor() {
    this.addBtn()
    this.bindEvent()
  }

  private btn!: HTMLButtonElement

  private live = true // 存活状态

  private addBtn() {
    // 在右侧添加快速下载按钮
    this.btn = document.createElement('button')
    this.btn.id = 'quick_down_btn'
    this.btn.textContent = '↓'
    this.btn.setAttribute(
      'title',
      lang.transl('_快速下载本页') + ' (Alt + Q)'
    )
    document.body.insertAdjacentElement('afterbegin', this.btn)
  }

  private bindEvent() {
    // 点击按钮启动快速下载
    this.btn.addEventListener(
      'click',
      () => {
        EVT.fire(EVT.events.QuickDownload)
      },
      false
    )

    // 使用快捷键 Alt + q 启动快速下载
    window.addEventListener(
      'keydown',
      (ev) => {
        if (this.live && ev.altKey && ev.keyCode === 81) {
          EVT.fire(EVT.events.QuickDownload)
        }
      },
      false
    )

    // 页面类型改变时销毁
    window.addEventListener(EVT.events.pageSwitchedTypeChange, () => {
      this.destroy()
    })
  }

  private destroy() {
    this.live = false

    const parent = this.btn.parentNode
    if (parent) {
      parent.removeChild(this.btn)
    }
  }
}

export { QuickDownloadBtn }