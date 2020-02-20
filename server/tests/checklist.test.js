import db, { memory_server, connect as db_connect } from "../src/db";
import * as checklist from '../src/models/checklist'

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
 * Checklist test suite.
 */
describe('checklist', () => {

    /**
     * Tests that a valid checklist can be created through the checklist_service without throwing any errors.
     */
    it('can be created correctly', () => {
        expect.assertions(1)
        return expect(checklist.model.create({
            title: 'tototo',
        })).resolves.not.toThrow()
    });

    /**
     * Tests that a valid checklist can be updated through the productService without throwing any errors.
     */
    it('can be updated correctly', () => {
        expect.assertions(1)
        return expect(checklist.model.updateMany({
            title: 'tototo',
        }, {
            checked: true,
        })).resolves.not.toThrow()
    });

    /**
     * Tests that a valid checklist can be deleted through the productService without throwing any errors.
     */
    it('can be deleted correctly', () => {
        expect.assertions(1)
        return expect(checklist.model.deleteMany({
            title: 'tototo',
        })).resolves.not.toThrow()
    });
});
