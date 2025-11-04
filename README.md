# Speed Keys - Typing Speed Test App# Speed Keys - Typing Speed Test AppThis is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

A modern, interactive typing speed test application built with Next.js and Tailwind CSS featuring a sleek dark theme.

## User Story 1 Implementation ✅A modern, interactive typing speed test application built with Next.js and Tailwind CSS.## Getting Started

### Features Implemented

All acceptance criteria from User Story 1 have been successfully implemented:## User Story 1 Implementation ✅First, run the development server:

#### ✅ Core Functionality

- **Random text generation**: Words are randomly selected from a pool of 180+ common English words

- **Instant start**: Click the text and start typing immediately### Features Implemented```bash

- **Real-time WPM calculation**: Words Per Minute is calculated and updated as you type

- **Accuracy tracking**: Percentage shown based on correct vs incorrect charactersnpm run dev

- **Error counting**: Total error count is tracked and displayed

- **Visual feedback**: All acceptance criteria from User Story 1 have been successfully implemented:# or

  - Correct characters are shown in **green**

  - Incorrect characters are shown in **red with a dark red background**yarn dev

  - Untyped characters are shown in **gray**

- **Test duration options**: Select 30, 60, or 90 seconds before starting#### ✅ Core Functionality# or

- **Countdown timer**: Timer counts down and automatically stops the test when time expires

- **Cursor indication**: Active cursor position is clearly marked with an animated **blue border**- **Random text generation**: Words are randomly selected from a pool of 180+ common English wordspnpm dev

#### ✅ Technical Implementation- **Instant start**: Users can start typing immediately when the page loads# or

- Uses React hooks (`useState`, `useEffect`, `useRef`) for state management

- Precise timing using `Date.now()`- **Real-time WPM calculation**: Words Per Minute is calculated and updated as you typebun dev

- Character-by-character comparison logic

- Copy-paste prevention (Ctrl+C, Ctrl+V, Ctrl+X, Ctrl+A blocked during test)- **Accuracy tracking**: Percentage shown based on correct vs incorrect characters```

- Real-time metrics calculation

- Direct keyboard input handling (no separate input box)- **Error counting**: Total error count is tracked and displayed

#### ✅ Additional Features- **Visual feedback**: Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

- **Results screen**: Shows comprehensive test results when complete:

  - Final WPM - Correct characters are shown in green with light green background

  - Accuracy percentage

  - Total errors - Incorrect characters are shown in red with light red backgroundYou can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

  - Characters typed

- **Restart functionality**: Restart button available at any time - Untyped characters are shown in gray

- **Dark theme design**: Modern dark interface with glassmorphism effects and gradient backgrounds

- **Duration selector**: Easy to switch between test durations before starting- **Test duration options**: Users can select 30, 60, or 90 secondsThis project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

- **Direct text interaction**: Click and type directly on the displayed text

- **Countdown timer**: Timer counts down and automatically stops the test when time expires

## Project Structure

- **Cursor indication**: Active cursor position is clearly marked with a blue animated border## Learn More

```

speed-keys/

├── app/

│   ├── page.tsx              # Main page component#### ✅ Technical ImplementationTo learn more about Next.js, take a look at the following resources:

│   ├── layout.tsx            # Root layout

│   └── globals.css           # Global styles- Uses React hooks (`useState`, `useEffect`, `useRef`, `useCallback`) for state management

├── components/

│   └── TypingTest.tsx        # Main typing test component (dark theme)- Precise timing using `Date.now()`- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.

├── lib/

│   ├── textGenerator.ts      # Random text generation utilities- Character-by-character comparison logic- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

│   └── typingMetrics.ts      # WPM and accuracy calculation utilities

└── public/                   # Static assets- Copy-paste prevention (Ctrl+C, Ctrl+V, Ctrl+X, Ctrl+A blocked during test)

```

- Real-time metrics calculationYou can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Getting Started

1. **Install dependencies**:

   ````bash#### ✅ Additional Features## Deploy on Vercel

   npm install

   ```- **Results screen**: Shows comprehensive test results when complete:

   ````

2. **Run the development server**: - Final WPMThe easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

   ```bash

   npm run dev  - Accuracy percentage

   ```

- Total errorsCheck out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

3. **Open your browser**:

   Navigate to [http://localhost:3000](http://localhost:3000) - Characters typed

- **Restart functionality**: Restart button available at any time

## How to Use- **Responsive design**: Clean UI with gradient background

- **Duration selector**: Easy to switch between test durations before starting

1. The app loads with a **dark theme** interface

2. **Click anywhere on the displayed text** to focus## Project Structure

3. **Start typing** - the timer begins automatically with your first keystroke

4. Type the displayed text as accurately and quickly as possible```

5. **Green text** indicates correct typing, **red text with background** indicates errorsspeed-keys/

6. The animated **blue cursor** shows your current position├── app/

7. Press **Backspace** to correct mistakes│ ├── page.tsx # Main page component

8. When time runs out or you complete the text, view your results│ ├── layout.tsx # Root layout

9. Click **"Try Again"** or **"Restart Test"** to practice again│ └── globals.css # Global styles

├── components/

**Note**: Copy and paste functionality is disabled during the test for fair results.│ └── TypingTest.tsx # Main typing test component

├── lib/

## Metrics Explained│ ├── textGenerator.ts # Random text generation utilities

│ └── typingMetrics.ts # WPM and accuracy calculation utilities

- **WPM (Words Per Minute)**: Calculated based on the standard of 5 characters = 1 word└── public/ # Static assets

- **Accuracy**: Percentage of correctly typed characters```

- **Errors**: Total number of incorrect characters typed

- **Time Left**: Countdown timer in seconds## Getting Started

## Design Features1. **Install dependencies**:

````bash

- **Dark Mode**: Eye-friendly dark theme with gradients   npm install

- **Glassmorphism**: Translucent cards with backdrop blur effects   ```

- **Color-coded Metrics**:

- Blue for WPM2. **Run the development server**:

- Green for Accuracy   ```bash

- Red for Errors   npm run dev

- Purple for Time   ```

- **Smooth Animations**: Pulse effect on cursor, hover transitions

- **Responsive Layout**: Works on desktop, tablet, and mobile3. **Open your browser**:

Navigate to [http://localhost:3000](http://localhost:3000)

## Technologies Used

## How to Use

- **Next.js 16** - React framework with App Router

- **TypeScript** - Type-safe JavaScript1. The app loads with a **dark theme** interface

- **Tailwind CSS** - Utility-first CSS framework2. Click anywhere on the displayed text to focus

- **React Hooks** - Modern React state management3. Start typing - the timer begins automatically with your first keystroke

4. Type the displayed text as accurately and quickly as possible

## Development5. **Green text** indicates correct typing, **red text with background** indicates errors

6. The animated **blue cursor** shows your current position

The app uses:7. Press **Backspace** to correct mistakes

- Server and Client Components (React Server Components)8. When time runs out or you complete the text, view your results

- TypeScript for type safety9. Click "Try Again" or "Restart Test" to practice again

- Tailwind CSS for styling

- ESLint for code quality (with custom rules for React Compiler warnings)**Note**: Copy and paste functionality is disabled during the test for fair results.



## Future Enhancements## Metrics Explained



See EPIC.md for planned features including:- **WPM (Words Per Minute)**: Calculated based on the standard of 5 characters = 1 word

- User Story 2: Enhanced test controls and result sharing- **Accuracy**: Percentage of correctly typed characters

- User Story 3: Performance tracking and progress visualization- **Errors**: Total number of incorrect characters typed

- User Story 4: Global leaderboard system- **Time Left**: Countdown timer in seconds

- User Story 5: Customizable themes and animations

## Technologies Used

## License

- **Next.js 16** - React framework with App Router

MIT- **TypeScript** - Type-safe JavaScript

- **Tailwind CSS** - Utility-first CSS framework
- **React Hooks** - Modern React state management

## Development

The app uses:
- Server and Client Components (React Server Components)
- TypeScript for type safety
- Tailwind CSS for styling
- ESLint for code quality

## Future Enhancements

See EPIC.md for planned features including:
- User Story 2: Enhanced test controls and result sharing
- User Story 3: Performance tracking and progress visualization
- User Story 4: Global leaderboard system
- User Story 5: Customizable themes and animations

## License

MIT
````
