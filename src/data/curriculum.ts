
import type { Subject } from "../types/learning";

export const subjects: Subject[] = [
  {
    id: "physics",
    name: "Physics",
    icon: "⚡",
    level: "Class 11–12",
    description: "Understand how the physical world works.",
    lessons: [
      {
        id: "motion",
        title: "Understanding Motion",
        duration: "5 min",
        introduction:
          "Motion means a change in an object's position over time.",
        keyIdeas: [
          "Distance is the total path travelled.",
          "Displacement is the change from starting to ending position.",
          "Speed is the distance travelled per unit of time.",
        ],
        example:
          "Walk 10 metres forward and 10 metres back. Your total distance is 20 metres, but your displacement is zero.",
        question: {
          prompt:
            "You walk 5 metres east, then 5 metres west back to your starting point. What is your displacement?",
          options: [
            "10 metres",
            "5 metres east",
            "0 metres",
            "5 metres west",
          ],
          correctAnswer: 2,
          explanation:
            "Displacement measures the change in position. You returned to your starting point, so it is zero.",
        },
      },
      {
        id: "speed",
        title: "Understanding Speed",
        duration: "4 min",
        introduction:
          "Speed tells us how much distance an object covers in a given amount of time.",
        keyIdeas: [
          "Speed = Distance ÷ Time.",
          "The SI unit of speed is metres per second (m/s).",
          "Average speed = Total distance ÷ Total time.",
        ],
        example:
          "A cyclist travels 100 metres in 20 seconds. Average speed = 100 ÷ 20 = 5 m/s.",
        question: {
          prompt:
            "A runner covers 60 metres in 10 seconds. What is the average speed?",
          options: ["6 m/s", "10 m/s", "50 m/s", "600 m/s"],
          correctAnswer: 0,
          explanation:
            "Average speed = distance ÷ time = 60 ÷ 10 = 6 m/s.",
        },
      },
      {
        id: "acceleration",
        title: "Understanding Acceleration",
        duration: "5 min",
        introduction:
          "Acceleration describes how quickly velocity changes over time. An object accelerates when it speeds up, slows down, or changes direction.",
        keyIdeas: [
          "Acceleration = Change in velocity ÷ Time taken.",
          "The SI unit is metres per second squared (m/s²).",
          "Acceleration can be positive, negative, or zero depending on the chosen direction and velocity change.",
        ],
        example:
          "A car's velocity increases from 0 m/s to 20 m/s in 5 seconds. Its average acceleration is (20 − 0) ÷ 5 = 4 m/s².",
        question: {
          prompt:
            "A bike's velocity changes from 4 m/s to 16 m/s in 3 seconds. What is its average acceleration?",
          options: ["4 m/s²", "6 m/s²", "12 m/s²", "20 m/s²"],
          correctAnswer: 0,
          explanation:
            "Acceleration = (final velocity − initial velocity) ÷ time = (16 − 4) ÷ 3 = 4 m/s².",
        },
      },
    ],
  },
  {
    id: "c",
    name: "C Programming",
    icon: "💻",
    level: "Beginner",
    description: "Learn to think logically and write code.",
    lessons: [
      {
        id: "variables",
        title: "Understanding Variables",
        duration: "5 min",
        introduction:
          "A variable is a named storage location that holds a value. Think of it as a labelled box.",
        keyIdeas: [
          "Every variable has a name and a type.",
          "The int type stores integer values.",
          "The = operator assigns a value.",
        ],
        example:
          "int age = 19;\n\nThis declares age as an integer and initializes it to 19.",
        question: {
          prompt: "Which declaration creates an integer variable in C?",
          options: [
            "text age = 19;",
            "int age = 19;",
            "age int = 19;",
            "integer = age;",
          ],
          correctAnswer: 1,
          explanation:
            "The int keyword declares an integer variable. The statement initializes age with the value 19.",
        },
      },
      {
        id: "conditions",
        title: "Making Decisions with if",
        duration: "5 min",
        introduction:
          "An if statement lets a C program execute code only when a condition is true.",
        keyIdeas: [
          "Use if to test a condition.",
          "Use else for an alternative path.",
          "In C, == compares two values; = assigns a value.",
        ],
        example:
          "int age = 19;\nif (age >= 18) {\n    printf(\"Adult\");\n}",
        question: {
          prompt: "Which operator checks whether two values are equal in C?",
          options: ["=", "==", "!=", ">="],
          correctAnswer: 1,
          explanation:
            "The == operator checks equality. A single = is the assignment operator.",
        },
      },
    ],
  },
  {
    id: "english",
    name: "English Vocabulary",
    icon: "📖",
    level: "All levels",
    description: "Build vocabulary for reading and speaking.",
    lessons: [
      {
        id: "context",
        title: "Learning Words Through Context",
        duration: "4 min",
        introduction:
          "Context is the information surrounding a word that helps you infer its meaning.",
        keyIdeas: [
          "Read the complete sentence before guessing.",
          "Look for examples and contrasting ideas.",
          "Use new words in your own sentences.",
        ],
        example:
          '"Despite the scorching heat, they continued walking." Scorching means extremely hot.',
        question: {
          prompt: 'What does "scorching" mean?',
          options: [
            "Freezing",
            "Extremely hot",
            "Very quiet",
            "Very dark",
          ],
          correctAnswer: 1,
          explanation: "Scorching describes something extremely hot.",
        },
      },
      {
        id: "curious",
        title: "Understanding Curious",
        duration: "3 min",
        introduction:
          "Curious describes someone who wants to know, learn, or discover something.",
        keyIdeas: [
          "Curious can describe a desire to learn.",
          "Curiosity often leads to asking questions.",
          "The context determines the precise meaning.",
        ],
        example:
          '"She was curious about how computers work." She wanted to understand them.',
        question: {
          prompt: "What does curious mean in this sentence?",
          options: [
            "Eager to know",
            "Very tired",
            "Angry",
            "Unwilling to learn",
          ],
          correctAnswer: 0,
          explanation:
            "Curious means eager to know, understand, or discover something.",
        },
      },
    ],
  },
];
