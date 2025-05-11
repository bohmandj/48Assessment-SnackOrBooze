import App from './App';
import {
    render,
    screen,
    waitFor,
    fireEvent
} from '@testing-library/react';
import SnackOrBoozeApi from './Api';

jest.mock('./Api');

const mockSnacksData = [{
    "id": "nachos",
    "name": "Nachos",
    "description": "An American classic!",
    "recipe": "Cover expensive, organic tortilla chips with Cheez Whiz.",
    "serve": "Serve in a hand-thrown ceramic bowl, garnished with canned black olives"
},
{
    "id": "hummus",
    "name": "Hummus",
    "description": "Sure to impress your vegan friends!",
    "recipe": "Purchase one container of hummus.",
    "serve": "Place unceremoniously on the table, along with pita bread."
}];
const mockDrinksData = [{
    "id": "martini",
    "name": "Martini",
    "description": "An ice-cold, refreshing classic.",
    "recipe": "Mix 3 parts vodka & 1 part dry vermouth.",
    "serve": "Serve very cold, straight up."
},
{
    "id": "negroni",
    "name": "Negroni",
    "description": "A nice drink for a late night conversation.",
    "recipe": "Mix equal parts of gin, Campari, and sweet vermouth.",
    "serve": "Serve cold, either on the rocks or straight up."
},
{
    "id": "gin-and-tonic",
    "name": "Gin and Tonic",
    "description": "Like regular tonic, but with gin.",
    "recipe": "Mix 2 parts gin & 1 part tonic water.",
    "serve": "Serve in a tall glass over ice, garnished with a lime wedge."
}];

describe('App', () => {
    it("renders without crashing", async () => {
        // mocking API responses
        SnackOrBoozeApi.getSnacks.mockResolvedValue(mockSnacksData);
        SnackOrBoozeApi.getDrinks.mockResolvedValue(mockDrinksData);

        render(<App />);
    });

    it("matches snapshot", async () => {
        // mocking API responses
        SnackOrBoozeApi.getSnacks.mockResolvedValue(mockSnacksData);
        SnackOrBoozeApi.getDrinks.mockResolvedValue(mockDrinksData);

        render(<App />);
        const { asFragment } = render(<App />);
        expect(asFragment()).toMatchSnapshot();
    });

    it("loads and displays food quantities correctly", async () => {
        // mocking API responses
        SnackOrBoozeApi.getSnacks.mockResolvedValue(mockSnacksData);
        SnackOrBoozeApi.getDrinks.mockResolvedValue(mockDrinksData);

        render(<App />);

        // initially loading should be true
        expect(screen.getByText("loading")).toBeInTheDocument();

        // wait for component to finish loading
        await waitFor(() => expect(screen.getByText("2 Snacks")).toBeInTheDocument());
        await waitFor(() => expect(screen.getByText("3 Drinks")).toBeInTheDocument());

        // loading should now be false
        expect(screen.queryByText("loading")).not.toBeInTheDocument();
    })
})

/* 
I keep consistently getting this Axios import issue 
preventing me from running any tests. Spent about 3 
hours trying to figure it out without success and plan 
to talk to my mentor about it at our next meeting.

FAIL  src/App.test.js
  ● Test suite failed to run

    Jest encountered an unexpected token

    Jest failed to parse a file. This happens e.g. when your code or its dependencies use non-standard JavaScript syntax, or when Jest is not configured to support such syntax.

    Out of the box Jest supports Babel, which will be used to transform your files into valid JS based on your Babel configuration.

    By default "node_modules" folder is ignored by transformers.

    Here's what you can do:
     • If you are trying to use ECMAScript Modules, see https://jestjs.io/docs/ecmascript-modules for how to enable it.
     • If you are trying to use TypeScript, see https://jestjs.io/docs/getting-started#using-typescript
     • To have some of your "node_modules" files transformed, you can specify a custom "transformIgnorePatterns" in your config.
     • If you need a custom transformation specify a "transform" option in your config.
     • If you simply want to mock your non-JS modules (e.g. binary assets) you can stub them out with the "moduleNameMapper" config option.

    You'll find more details and examples of these config options in the docs:
    https://jestjs.io/docs/configuration
    For information about custom transformations, see:
    https://jestjs.io/docs/code-transformation

    Details:

    /Users/davidbohman/Library/CloudStorage/GoogleDrive-bohmandj@gmail.com/My Drive/Springboard/48Assessment-SnackOrBooze/react-2/snack-or-booze/node_modules/axios/index.js:1
    ({"Object.<anonymous>":function(module,exports,require,__dirname,__filename,jest){import axios from './lib/axios.js';
                                                                                      ^^^^^^

    SyntaxError: Cannot use import statement outside a module

    > 1 | import axios from "axios";
        | ^
      2 |
      3 | const BASE_API_URL = "http://localhost:5000";
      4 |

      at Runtime.createScriptFromCode (node_modules/jest-runtime/build/index.js:1728:14)
      at Object.<anonymous> (src/Api.js:1:1)
      at Object.<anonymous> (src/App.js:8:1)
      at Object.<anonymous> (src/App.test.js:1:1)
      at TestScheduler.scheduleTests (node_modules/@jest/core/build/TestScheduler.js:333:13)
      at runJest (node_modules/@jest/core/build/runJest.js:404:19)

Test Suites: 1 failed, 1 total 
*/