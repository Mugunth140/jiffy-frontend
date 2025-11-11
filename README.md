# Jiffy - Your Productivity Companion

Jiffy is a modern, local-first productivity application built with React Native and Expo. It helps you manage your tasks efficiently with a clean, intuitive interface.

## Features

- **Local-First Architecture**: All your data is stored locally on your device using AsyncStorage
- **Task Management**: Create, edit, and delete tasks with ease
- **Priority Levels**: Organize tasks by priority (Low, Medium, High)
- **Task Filtering**: View all tasks, active tasks, or completed tasks
- **Real-time Stats**: Track your productivity with task statistics
- **Offline Support**: Works completely offline - no internet required
- **Cross-Platform**: Runs on iOS, Android, and Web

## Tech Stack

- **React Native**: Cross-platform mobile development
- **Expo**: Development framework and tooling
- **TypeScript**: Type-safe development
- **React Navigation**: Seamless navigation between screens
- **AsyncStorage**: Local data persistence
- **UUID**: Unique task identifiers

## Architecture

### Local-First Design

Jiffy follows a local-first architecture pattern:

1. **Data Storage**: All data is stored locally using `@react-native-async-storage/async-storage`
2. **Instant Updates**: Changes are immediately persisted to local storage
3. **No Backend Required**: The app works completely offline
4. **Future Ready**: Architecture designed to easily add sync capabilities later

### Project Structure

```
src/
├── components/        # Reusable UI components
│   └── TaskItem.tsx  # Individual task display component
├── navigation/        # Navigation configuration
│   ├── AppNavigator.tsx
│   └── types.ts
├── screens/          # Screen components
│   ├── HomeScreen.tsx
│   ├── AddTaskScreen.tsx
│   └── TaskDetailScreen.tsx
├── services/         # Business logic and data layer
│   ├── StorageService.ts  # Local storage operations
│   └── TaskManager.ts     # Task management logic
└── types/            # TypeScript type definitions
    └── index.ts
```

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Expo CLI (installed automatically with dependencies)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Mugunth140/jiffy-frontend.git
cd jiffy-frontend
```

2. Install dependencies:
```bash
npm install
```

### Running the App

Start the development server:
```bash
npm start
```

Then choose your platform:

- **iOS Simulator**: Press `i`
- **Android Emulator**: Press `a`
- **Web Browser**: Press `w`
- **Expo Go App**: Scan the QR code with your device

### Available Scripts

- `npm start` - Start the Expo development server
- `npm run android` - Run on Android
- `npm run ios` - Run on iOS
- `npm run web` - Run on Web
- `npm test` - Run tests
- `npm run lint` - Run ESLint

## Usage

### Creating a Task

1. Tap the **+** button on the home screen
2. Enter a task title (required)
3. Optionally add a description
4. Select a priority level
5. Tap **Save**

### Managing Tasks

- **Complete a task**: Tap the checkbox next to the task
- **View details**: Tap on any task to see full details
- **Edit a task**: Open task details and tap **Edit**
- **Delete a task**: Open task details and tap **Delete Task**

### Filtering Tasks

Use the filter buttons at the top of the home screen:
- **All**: Show all tasks
- **Active**: Show only incomplete tasks
- **Completed**: Show only completed tasks

## Data Persistence

All tasks are automatically saved to your device's local storage. Your data:
- Persists between app restarts
- Stays on your device
- Is never sent to external servers
- Can be easily extended to support cloud sync in the future

## Development

### Adding New Features

The codebase is organized to make adding features straightforward:

1. **New Data Fields**: Update types in `src/types/index.ts`
2. **Storage Logic**: Modify `src/services/StorageService.ts`
3. **Business Logic**: Update `src/services/TaskManager.ts`
4. **UI Components**: Add to `src/components/` or `src/screens/`

### Future Enhancements

Potential features to add:
- Task categories/tags
- Due dates with reminders
- Recurring tasks
- Cloud sync support
- Search functionality
- Dark mode
- Task sharing
- Export/import functionality

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.

## Acknowledgments

Built with ❤️ using Expo and React Native
