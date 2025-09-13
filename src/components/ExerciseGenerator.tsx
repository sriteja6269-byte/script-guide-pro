import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Zap, Trophy, Clock, Star, RefreshCw } from 'lucide-react';

interface Exercise {
  id: number;
  title: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  description: string;
  starterCode: string;
  solution: string;
  hints: string[];
  topic: string;
}

interface ExerciseGeneratorProps {
  onLoadExercise?: (code: string) => void;
}

const exercises: Exercise[] = [
  {
    id: 1,
    title: "Sum of Two Numbers",
    difficulty: 'beginner',
    description: "Write a function that takes two numbers and returns their sum.",
    starterCode: `// Write a function called 'add' that takes two parameters
// and returns their sum

function add(a, b) {
  // Your code here
  
}

// Test your function
console.log(add(5, 3)); // Should output: 8`,
    solution: `function add(a, b) {
  return a + b;
}`,
    hints: [
      "Use the + operator to add two numbers",
      "Don't forget to return the result",
      "Make sure to handle both parameters"
    ],
    topic: "functions"
  },
  {
    id: 2,
    title: "Find Maximum in Array",
    difficulty: 'intermediate',
    description: "Create a function that finds the largest number in an array.",
    starterCode: `// Write a function called 'findMax' that takes an array
// and returns the largest number

function findMax(numbers) {
  // Your code here
  
}

// Test your function
console.log(findMax([1, 5, 3, 9, 2])); // Should output: 9`,
    solution: `function findMax(numbers) {
  return Math.max(...numbers);
  // Alternative: let max = numbers[0]; for(let i = 1; i < numbers.length; i++) { if(numbers[i] > max) max = numbers[i]; } return max;
}`,
    hints: [
      "You can use Math.max() with the spread operator",
      "Or iterate through the array comparing values",
      "Handle the case of an empty array"
    ],
    topic: "arrays"
  },
  {
    id: 3,
    title: "Count Vowels",
    difficulty: 'intermediate',
    description: "Write a function that counts the number of vowels in a string.",
    starterCode: `// Write a function called 'countVowels' that takes a string
// and returns the number of vowels (a, e, i, o, u)

function countVowels(str) {
  // Your code here
  
}

// Test your function
console.log(countVowels("hello world")); // Should output: 3`,
    solution: `function countVowels(str) {
  const vowels = 'aeiouAEIOU';
  let count = 0;
  for (let char of str) {
    if (vowels.includes(char)) {
      count++;
    }
  }
  return count;
}`,
    hints: [
      "Create a string or array of vowels to check against",
      "Loop through each character in the string",
      "Consider both uppercase and lowercase vowels"
    ],
    topic: "strings"
  },
  {
    id: 4,
    title: "Fibonacci Sequence",
    difficulty: 'advanced',
    description: "Generate the first n numbers of the Fibonacci sequence.",
    starterCode: `// Write a function called 'fibonacci' that takes a number n
// and returns an array of the first n Fibonacci numbers

function fibonacci(n) {
  // Your code here
  
}

// Test your function
console.log(fibonacci(7)); // Should output: [0, 1, 1, 2, 3, 5, 8]`,
    solution: `function fibonacci(n) {
  if (n <= 0) return [];
  if (n === 1) return [0];
  
  const fib = [0, 1];
  for (let i = 2; i < n; i++) {
    fib[i] = fib[i - 1] + fib[i - 2];
  }
  return fib;
}`,
    hints: [
      "Start with [0, 1] for the first two numbers",
      "Each subsequent number is the sum of the previous two",
      "Handle edge cases like n <= 0"
    ],
    topic: "algorithms"
  }
];

const ExerciseGenerator: React.FC<ExerciseGeneratorProps> = ({ onLoadExercise }) => {
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [selectedTopic, setSelectedTopic] = useState<string>('all');
  const [currentExercise, setCurrentExercise] = useState<Exercise | null>(null);
  const [showHints, setShowHints] = useState(false);
  const [showSolution, setShowSolution] = useState(false);

  const difficulties = ['all', 'beginner', 'intermediate', 'advanced'];
  const topics = ['all', 'functions', 'arrays', 'strings', 'algorithms', 'objects'];

  const filteredExercises = exercises.filter(exercise => {
    const difficultyMatch = selectedDifficulty === 'all' || exercise.difficulty === selectedDifficulty;
    const topicMatch = selectedTopic === 'all' || exercise.topic === selectedTopic;
    return difficultyMatch && topicMatch;
  });

  const generateRandomExercise = () => {
    if (filteredExercises.length === 0) return;
    
    const randomIndex = Math.floor(Math.random() * filteredExercises.length);
    const exercise = filteredExercises[randomIndex];
    setCurrentExercise(exercise);
    setShowHints(false);
    setShowSolution(false);
  };

  const loadExerciseCode = () => {
    if (currentExercise && onLoadExercise) {
      onLoadExercise(currentExercise.starterCode);
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner':
        return 'bg-success/10 text-success border-success/20';
      case 'intermediate':
        return 'bg-warning/10 text-warning border-warning/20';
      case 'advanced':
        return 'bg-destructive/10 text-destructive border-destructive/20';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-primary" />
            Exercise Generator
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Generate coding exercises to practice your skills
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Difficulty</label>
              <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {difficulties.map(difficulty => (
                    <SelectItem key={difficulty} value={difficulty}>
                      {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Topic</label>
              <Select value={selectedTopic} onValueChange={setSelectedTopic}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {topics.map(topic => (
                    <SelectItem key={topic} value={topic}>
                      {topic.charAt(0).toUpperCase() + topic.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-end">
              <Button 
                onClick={generateRandomExercise}
                className="w-full gap-2 bg-gradient-primary"
                disabled={filteredExercises.length === 0}
              >
                <RefreshCw className="w-4 h-4" />
                Generate Exercise
              </Button>
            </div>
          </div>
          
          <div className="text-sm text-muted-foreground">
            {filteredExercises.length} exercises available with current filters
          </div>
        </CardContent>
      </Card>

      {currentExercise && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Trophy className="w-5 h-5 text-primary" />
                {currentExercise.title}
              </CardTitle>
              <div className="flex items-center gap-2">
                <Badge className={getDifficultyColor(currentExercise.difficulty)}>
                  {currentExercise.difficulty}
                </Badge>
                <Badge variant="outline">
                  {currentExercise.topic}
                </Badge>
              </div>
            </div>
            <p className="text-muted-foreground">{currentExercise.description}</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={loadExerciseCode}
                className="gap-2"
              >
                <Star className="w-4 h-4" />
                Load Starter Code
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowHints(!showHints)}
                className="gap-2"
              >
                💡 {showHints ? 'Hide' : 'Show'} Hints
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowSolution(!showSolution)}
                className="gap-2"
              >
                🔍 {showSolution ? 'Hide' : 'Show'} Solution
              </Button>
            </div>

            {showHints && (
              <Card className="bg-info/5 border-info/20">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base flex items-center gap-2">
                    💡 Hints
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <ul className="space-y-1">
                    {currentExercise.hints.map((hint, index) => (
                      <li key={index} className="text-sm flex items-start gap-2">
                        <span className="text-info font-medium">{index + 1}.</span>
                        <span>{hint}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            {showSolution && (
              <Card className="bg-success/5 border-success/20">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base flex items-center gap-2">
                    🔍 Solution
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="bg-code-bg rounded-lg p-4 border border-code-border">
                    <pre className="text-sm text-foreground overflow-x-auto">
                      <code>{currentExercise.solution}</code>
                    </pre>
                  </div>
                </CardContent>
              </Card>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ExerciseGenerator;