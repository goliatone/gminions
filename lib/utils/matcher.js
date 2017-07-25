'use strict';

module.exports = function match(topic, type) {
    if (type === topic) return true;
    let pattern = '^' + type.replace(/\+/g, '([^.]+)').replace(/\*/g, '([^.]+\.?)+') + '$';
    return topic.search(pattern) !== -1;
}
