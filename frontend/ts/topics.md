# TypeScript Topics

- **Introduction to TypeScript**: Understanding the differences between statically typed languages and dynamically typed languages like vanilla JavaScript. This includes learning how TypeScript catches mistakes at compile time, alongside understanding its drawbacks, such as the required compilation (transpilation) step.

- **Environment Setup and Compilation**:
  - Installing Node.js and using the Node Package Manager (npm) to install the TypeScript compiler globally using `npm i -g typescript`.
  - Writing the first program and compiling it from a `.ts` file into a `.js` file using the `tsc` command.

- **Configuring the Compiler**:
  - Initializing a `tsconfig.json` file to manage project-wide settings.
  - Adjusting compiler options such as `target` to specify the JavaScript output version (e.g., ES2016), setting `rootDir` for source files, and `outDir` for the output files.
  - Enabling strict options like `noEmitOnError` to prevent the generation of JavaScript files if the TypeScript code contains errors, and using `removeComments` for cleaner output.

- **Debugging**: Generating source maps (`sourceMap`) to link TypeScript code to the compiled JavaScript, and setting up environments like VS Code (`launch.json`) to execute code line-by-line, inspect variables, and set breakpoints.

- **Fundamental Types and Features**:
  - **Primitives and Type Inference**: Working with `number`, `string`, and `boolean`, and relying on the compiler to automatically detect types when values are initialized.
  - **The `any` Type**: Understanding the dangers of the `any` type (which defeats the purpose of type checking) and learning how to restrict it using the `noImplicitAny` configuration.
  - **Arrays and Tuples**: Defining arrays of specific types to prevent mixed-type errors, and using Tuples for fixed-length arrays where each element has an exact type (like key-value pairs).
  - **Enums**: Grouping lists of related constants (e.g., sizes like Small, Medium, Large) and utilizing the `const enum` keyword for highly optimized JavaScript output.

- **Functions**:
  - Properly annotating input parameters and defining return types, including the `void` type for functions that do not return a value.
  - Implementing optional parameters with `?` and setting default values.
  - Enabling strict compiler checks like `noUnusedLocals`, `noUnusedParameters`, and `noImplicitReturns` to ensure code safety.

- **Object Types**:
  - **Object Shapes**: Defining the shape of objects, marking properties as optional, and using the `readonly` modifier to prevent accidental data modifications.
  - **Methods**: Adding method signatures directly within object type annotations.

- **Advanced Types**:
  - **Type Aliases**: Creating custom names for types to keep code readable, avoid duplication, and adhere to the DRY (Don't Repeat Yourself) principle.
  - **Union Types**: Allowing a value to be one of several types using the `|` operator, paired with "narrowing" techniques (like `typeof`) to execute specific logic based on the actual type.
  - **Intersection Types**: Combining multiple separate types into one unified type using the `&` operator (e.g., an object that is both `Draggable` and `Resizable`).
  - **Literal Types**: Restricting variables to exact, specific values rather than broad types (e.g., ensuring a metric is only ever `"centimeter"` or `"inch"`).
  - **Nullable Types**: Safely working with `null` and `undefined` by utilizing Union types and the `strictNullChecks` compiler option.
  - **Optional Chaining**: Using the `?.` operator for safe property access, array element access, and function calls without crashing the app if the underlying object is null or undefined.

- **Interfaces and Generics**:
  - **Interfaces**: Using `interface` declarations as an alternative to Type Aliases to explicitly describe an object's shape.
  - **Structural Typing (Duck Typing)**: Understanding that TypeScript focuses on the "shape" of values; if two objects or classes share the same required properties, they are considered compatible types.
  - **Generics**: Adding variables to types (e.g., `Array<string>`) to build reusable and dynamic components that can handle various types while retaining strict type safety.