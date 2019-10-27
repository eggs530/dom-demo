//原本需写入document.createElement('div')
//const div = dom.create('<div><span></span></div>')//此处不能放td,td不能放入div里

const div = dom.create('<tr><td>hi</td></tr>')

const div = dom.create('<div>newDiv</div>')
console.log(div)

dom.after(test, div)

const div3 = dom.creatElement("<div id='parent'></div>")

const nodes = dom.empty(window.empty)
console.log(nodes)

dom.attr(test, 'title', 'Hello')
const title = dom.attr(test, 'title')
console.log(`title':${title}`)

dom.text(text, '你好，这是新的内容')
dom.text(test)

dom.style(test, { border: '1px solid red', color: 'blue' })
console.log(dome.style(test, 'border'))
dom.style(test, 'border', '1px solid black')

dom.class.add(test, 'red')
dom.class.add(test, 'blur')
dom.class.remove(test, 'blue')
console.log(dom.class.has(test, 'blue'))

const fn = () => {
    console.log('点击了')
}
dom.on(test, 'click', fn)
dom.off(test, 'click', fn)

const testDiv = dom.find('#test')[0]
console.log(testDiv)
const test2 = dom.find('#test')[0]
console.log(dom.find('.red', test2))[0]

console.log(dom.parent(test))

const s2 = dom.find('#s2')[0]
console.log(dom.siblings(s2))
console.log(dom.next(s2))
console.log(dom.previous(s2))

const t = dom.find('#travel')[0]
dom.each(dom.children(t), (n) => dom.style(n, 'color', 'red'))

console.log(dom.index(s2))