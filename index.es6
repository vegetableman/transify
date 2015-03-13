import events from 'add-event-listener'
import transitionEnd from 'transitionend-property'

export default ((elem, opts = {}) => {
    const TICK = 17

    if (!elem)
        throw new Error('Provide an element.')
    if (!opts['transitionName'])
        throw new Error('Provide a transition name.')


    function applyTransition(node, type, cb) {
        const className = opts.transitionName + '-' + type
        const activeClassName = className + '-active'
        const endListener = () => {
            if(cb) cb()
            node.classList.remove(className)
            node.classList.remove(activeClassName)
            events.removeEventListener(node, endListener)
        }

        events.addEventListener(node, transitionEnd, endListener)
        node.classList.add(className)
        setTimeout(() => {
            node.classList.add(activeClassName)
        }, opts.tick || TICK)
    }

    return {
        append: (node) => {
            applyTransition(node, 'enter')
            elem.appendChild(node)
        },

        remove: (node) => {
            applyTransition(node, 'leave', () => {
                elem.removeChild(node)
            })
        }
    }
})