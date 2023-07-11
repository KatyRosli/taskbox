import InboxScreen from "./InboxScreen";
import store from '../lib/store';
import { rest } from 'msw';
import { MockedState } from './TaskList.stories';
import { Provider } from 'react-redux';
import { fireEvent, within, waitFor, waitForElementToBeRemoved, findByTestId } from '@storybook/testing-library';

export default {
    component: InboxScreen,
    title: 'Inbox Screen',
    decorators: [(story) => <Provider store={store}>{story()}</Provider>],
    tags: ['autodocs'],
};

export const Default = {
    parameters: {
        msw: {
            handlers: [
                rest.get(
                    'https://jsonplaceholder.typicode.com/todos?userId=1',
                    (reg, res, ctx) => {
                        return res(ctx.json(MockedState.tasks));
                    }
                ),
            ],
        },
    },
    play: async ({ canvasElement }) => {
        const canvas = within (canvasElement);
        //Waits for the component to transition from the loading state
        await waitForElementToBeRemoved(await canvas.findByTestId('loading'));
        //Waits for the component to be updated based on the store
        await waitFor(async () => {
            //Stimulates pinning the first task
            await fireEvent.click(canvas.getByLabelText('pinTask-1'));
            //Stimulates pinning the third task
            await fireEvent.click(canvas.getByLabelText('pinTask-3'));
        });
    },
};

export const Error ={
    parameters: {
        msw: {
            handlers: [
                rest.get(
                    'https://jsonplaceholder.typicode.com/todos?userId=1',
                    (req, res, ctx) => {
                        return res(ctx.status(403));
                    }
                ),
            ],
        },
    },
};
