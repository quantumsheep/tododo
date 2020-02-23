import db, { memory_server, connect as db_connect } from "../src/db"
import * as todolist from '../src/models/todolist'

/**
 * Connect to a new in-memory database before running any tests.
 */
beforeAll(async () => await db_connect())

/**
 * Clear all test data after every test.
 */
afterEach(async () => {
    const collections = Object.values(db.connection.collections)
    await Promise.all(collections.map(c => c.deleteMany()))
})

/**
 * Remove and close the db and server.
 */
afterAll(async () => {
    await db.connection.dropDatabase()
    await db.connection.close()
    await memory_server.stop()
})

/**
 * Todolist test suite.
 */
describe('todolist', () => {

    it('can be created correctly', () => {
        expect.assertions(1)
        return expect(todolist.model.create({
            title: 'tototo',
        })).resolves.not.toThrow()
    })

    it('can be updated correctly', () => {
        expect.assertions(1)
        return expect(todolist.model.updateMany({
            title: 'tototo',
        }, {
            checked: true,
        })).resolves.not.toThrow()
    })

    it('can be deleted correctly', () => {
        expect.assertions(1)
        return expect(todolist.model.deleteMany({
            title: 'tototo',
        })).resolves.not.toThrow()
    })
})
