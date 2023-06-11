import { installQuasarPlugin } from '@quasar/quasar-app-extension-testing-unit-vitest';
import { mount } from '@vue/test-utils';
import { describe, expect, it, afterEach, beforeEach, vi } from 'vitest';
// import ExampleComponent from './demo/ExampleComponent.vue';
import ExampleComponent from '../../../src/components/ExampleComponent.vue';
import { Todo, Meta } from '../../../src/components/models';
import axios from 'axios'

installQuasarPlugin();
vi.mock('axios')

describe('example Component', () => {
    beforeEach(() => {
        ;
    })

    afterEach(() => {
        vi.restoreAllMocks()
    })

    it('should mount component with todos', () => {
        const wrapper = mount(ExampleComponent, {
            props: {
                title: 'Hello',
                // totalCount: 4,
                meta: { totalCount: 4 } as Meta,
                todos: [
                    { id: 1, content: 'Hallo' },
                    { id: 2, content: 'Hoi' },
                ] as Todo[],
            },
        });
        expect(wrapper.vm.clickCount).toBe(0);
        // expect(wrapper.find('.q-item')).toBe(0);
        wrapper.find('.q-item').trigger('click');
        expect(wrapper.vm.clickCount).toBe(1);
    });

    it('should mount component without todos', () => {
        const wrapper = mount(ExampleComponent, {
            props: {
                title: 'Hello',
                meta: { totalCount: 0 },
            },
        });
        expect(wrapper.findAll('.q-item')).toHaveLength(0);
    });

    it('mock axios', async () => {
        const usersMock = [{ id: 1 }, { id: 2 }]
        axios.get.mockResolvedValue({ data: usersMock })

        const users = (await axios.get('/users')).data

        expect(axios.get).toHaveBeenCalledWith('/users')
        expect(users).toStrictEqual(usersMock)
    });
});
