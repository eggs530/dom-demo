window.dom = {
    //create(string) {
    //const container = document.createElement('div')
    //如果要放入任意元素，可用('template')
    //container.innerHTML = string
    //return container.children[0]
    //}
    //万能创建方法
    create(string) {
        const container = document.createElement('template')
        container.innerHTML = string.trim()//trim可以把字符串两边的空格去掉
        return container.content.firstChild
    },
    after(node, node2) {
        console.log(node.nextSibling)
        node.parentNode.insertBefore(node2, node.nextSibling)
        //找到该节点的爸爸使用insertBefore,在下一个节点前插入node2
    },
    before(node, node2) {
        node.parentNode.insertBefore(node2, node)
    },
    append(parent, node) {
        parent.appendChild(node)
    },
    wrap(node, parent) {
        dom.before(node, parent)//先将node插入到parent前面
        dom.append(parent, node)//再将node插入到parent里面
    },
    remove(node) {
        node.parentNode.removeChild(node)
        return node
    },
    //empty(node){
    // node.innerHTML = ''
    //或者const {childNodes} = node
    //for (let i=0;i<childNodes.length;i++){此处length会随时变化所以不能这么写
    //dom.remove(childNodes[i])
    //Array.push(childNodes[i])
    //}
    //return array//返回移除的对象
    //}
    empty(node) {
        const { childNodes } = node//const childNodes = node.childNotes的简写
        const array = []
        let x = node.firstChild
        while (x) {
            array.push(dom.remove(node.firstChild))
            x = dom.firstChild
        }
        return array
    },
    attr(node, name, value) {//重载
        if (arguments.length === 3) {
            node.setAttribute(name, value)
        } else if (arguments.length === 2) {
            return node.getAttribute(name)
        }
    },
    text(node, string) {//适配
        if (arguments.length === 2) {//想设置
            if ('innerText' in node) {
                node.innerText = string//ie
            } else {
                node.textContent = string //firefox/Chrome}
            }
        } else if (arguments.length === 2) {//想获取节点内容
            if ('innerText' in node) {
                return node.innerHTMLText
            } else if (arguments.length === 1) {
                return node.textContent
            }
        }

    },
    html(node, string) {
        if (arguments.length === 2) {
            node.innerHTML = string
        } else if (arguments.length === 1) {
            return node.innerHTML
        }
    },
    style(node, name, value) {
        if (arguments.length === 3) {//写
            //dom.style(div,'color','red')
            node.style[name] = value
        } else if (arguments.length === 2) {//获取
            if (typeof name === 'string') {
                //dom.style(div,'color')
                return node.style[name]
            } else if (name instanceof Object) {
                //dom.style(div,{color:'red'})
                const object = name
                for (let key in name) {
                    //key:border / color
                    //node.style.border = ...
                    //node.style.color = ...
                    node.style[key] = name[key]//此处不能.key,会变成一个字符串  
                }
            }
        }
    },
    class: {
        add(node, className) {
            node.classList.add(className)
        },
        remove(node, className) {
            node.classList.remove(className)
        },
        has(node, className) {
            return node.classList.contains(className)
        }
    },
    on(node, eventName, fn) {
        node.addEventListener(eventName, fn)
    },
    off(node, eventName, fn) {
        node.removeEventListener(eventName, fn)
    },
    find(selector, scope) {
        return (scope || document).querySelectorAll(selector)
    },
    parent(node) {
        return node.parentNode
    },
    children(node) {
        return node.children
    },
    siblings(node) {
        return Array.from(node.parentNode.children)//伪数组不能filter,要先变成数组
            .filter(n => n !== node)
    },
    next(node) {
        let x = node.nextSibling
        while (x && x.nodeType === 3) {//判断是否文本节点
            x = x.next
        }
        return x
    },
    previous(node) {
        let x = node.previousSibling
        while (x && x.nodeType === 3) {
            x = x.previousSibling
        }
        return x
    },
    each(nodeList, fn) {
        for (let i = 0; i < nodeList.length; i++) {
            fn.call(null, nodeList[i])
        }
    },
    index(node) {
        const list = dom.children(node, parentNode)
        let i
        for (let i = 0; i < list.length; i++) {
            if (list[i] === node) {
                break
            }
        }
        return i
    }
}
