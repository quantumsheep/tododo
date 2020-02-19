import * as db from "./db-handler";
import * as checklist from '../src/models/checklist'

/**
 * Connect to a new in-memory database before running any tests.
 */
beforeAll(async () => await db.connect())

/**
 * Clear all test data after every test.
 */
afterEach(async () => await db.clear_database())

/**
 * Remove and close the db and server.
 */
afterAll(async () => await db.close_database())

/**
 * Checklist test suite.
 */
describe('checklist', () => {

    /**
     * Tests that a valid checklist can be created through the checklist_service without throwing any errors.
     */
    it('can be created correctly', async () => {
        expect(async () => await checklist.model.create(checklist_test))
            .not
            .toThrow()
    });

    /**
     * Tests that a valid checklist can be updated through the productService without throwing any errors.
     */
    it('can be updated correctly', async () => {
        expect(async () => await checklist.model.update(checklist_test, checklist_modified))
            .not
            .toThrow()
    });

    /**
     * Tests that a valid checklist can be deleted through the productService without throwing any errors.
     */
    it('can be deleted correctly', async () => {
        expect(async () => await checklist.model.remove(checklist_test))
            .not
            .toThrow()
    });
});

/**
 * Complete checklist example.
 */
const checklist_test = {
    title: 'tototo',
}

/**
 * Checklist modified example.
 */
const checklist_modified = {
    title: 'tototo',
    checked: true,
}
