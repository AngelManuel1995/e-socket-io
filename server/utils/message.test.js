let expect = require('expect')
let { generateMessage } = require('./message')

describe('generateMessage', () => {
    it('should generate correct message object', () => {

        let from = 'jen'
        let text = 'Some message'
        let message = generateMessage(from, text)

        expect(typeof message.createdAt).toBe('number');

    })
})