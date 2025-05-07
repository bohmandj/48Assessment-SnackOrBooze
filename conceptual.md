### Conceptual Exercise

Answer the following questions below:

- What is the purpose of the React Router?

  - React router is used to provide tools and methods for quickly and easily building client side routing for single page React apps.

- What is a single page application?

  - With a single page application the app stays running and just changes the visible components to 'change the page' without sending requests to the server or having to reload a new html page. Even though the page never reloads or changes, it still updates the url and allows for 'page' specific bookmarking.

- What are some differences between client side and server side routing?

  - Client side: loads all in one big bundle, but after initial load page transitions are very fast and app-like since pages aren't actually re-loading. These are single-page apps that simulate the server side experience by hiding/showing different components based on user interaction, while still changing the url and allowing 'page' bookmarking even though it's all built off of a single html file.
  - Server side: loads page-by-page, so page transitions are slower and can flicker as the next page loads. Each page you visit corresponds to a different html file served request-by-request to the client by the server.

- What are two ways of handling redirects with React Router? When would you use each?

  - Inside your component's logic you can use an imperative redirect with ```useNavigate()```, typically in a ```useEffect()``` or an event handler. Use this when you want full control in JS because of some condition or side effect like a form being submitted, a user is not authenticated, or some state changes like a timer or user choice.
  - There is also a declarative redirect with ```<Navigate />``` which is a component used as part of rendering logic. You'd use this when conditionally rendering a redirect based on props or state, or you want to keep things clean and declarative inside JSX.

- What are two different ways to handle page-not-found user experiences using React Router? 

  - One way to handle a page-not-found error is to use a catch-all-route like ```<Route path="*" element={<NotFound />} />``` that leads to a defined NotFound component for every path not covered by your other routes. (This method could also be used inside a nested route that leads to a more specific not-found page, like routing to a ```<DashboardNotFound />``` component in a catch-all sub-route of a route like ```<Route path="/dashboard" element={<DashboardLayout />}>```)
  - Alternatively, you could use a Navigate component to redirect unmatched routes to your homepage or somewhere else of your choosing: ```<Route path="*" element={<Navigate to="/" replace />} />``` (This should be used only intentionally, it may be confusing for users to just be redirected if they're expecting to find a 404 page)

- How do you grab URL parameters from within a component using React Router?

  - From inside a component, you use the ```useParams``` hook. If you have a route like: ```<Route path="/colors/:color" element={<Color />}>``` (the param is whatever replaces ":color" in the url), and a user tries to access ```/colors/blue``` you'd access it from within the Color component like this: ```const {color} = useParams(); // color === "blue"```.

- What is context in React? When would you use it?

  - Context in React is a way to avoid prop drilling, or passing data as props through several layers of nested components to get the information to where it is actually needed to be used. Instead, you can wrap the whole nested stack of components in context, provide the information to the context where it is defined and controlled, and access it from the context anywhere lower in that stack of nested components. 

- Describe some differences between class-based components and function components in React.

    - Functional components are simpler, are able to use hooks, are easier to test, read and reason about, and don't have access to the 'this' keyword since props and state are accessed directly. Using functional components is now the recommended standard moving forward.
    - Class-based components are where React started, they use much more boilerplate code, require the use of 'this' in the constructor for things like props and state, and also use more lifecycle methods like ```componentDidMount()``` or ```componentDidUpdate()``` instead of comparable hooks in functional components.

- What are some of the problems that hooks were designed to solve?

  - Reusing stateful logic was difficult, leading to the use of prop drilling, using render props, or writing higher-order components.
  - Components became complex and bloated.
  - Related logic sometimes got split across lifecycle methods.
  - The use of 'this' and complexities around its context or need for binding often caused bugs.
  - More complex class-based components were more difficult to test and maintain.
  - Hooks made React code more modular, easier to read, test and maintain, free of boilerplate (constructors, this, etc.), and better at handling side effects and code reuse.