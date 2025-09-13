import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ChevronLeft, ChevronRight, BookOpen, Code, Target, CheckCircle2 } from 'lucide-react';

interface TutorialStep {
  id: number;
  title: string;
  content: string;
  code?: string;
  objective: string;
  tips: string[];
}

interface TutorialPanelProps {
  tutorial?: {
    title: string;
    description: string;
    steps: TutorialStep[];
  };
  onCodeLoad?: (code: string) => void;
}

const tutorials = {
  javascript: {
    title: "JavaScript Fundamentals",
    description: "Learn the basics of JavaScript programming with interactive examples.",
    steps: [
      {
        id: 1,
        title: "Variables and Data Types",
        content: "In JavaScript, you can declare variables using `let`, `const`, or `var`. Let's start with the basics.",
        code: `// Variable declarations
let name = "Alice";
const age = 25;
var isStudent = true;

console.log("Name:", name);
console.log("Age:", age);
console.log("Is Student:", isStudent);`,
        objective: "Understand how to declare and use variables in JavaScript",
        tips: [
          "Use 'let' for variables that can change",
          "Use 'const' for values that won't change",
          "Avoid 'var' in modern JavaScript"
        ]
      },
      {
        id: 2,
        title: "Functions",
        content: "Functions are reusable blocks of code. You can declare them in multiple ways.",
        code: `// Function declaration
function greet(name) {
  return "Hello, " + name + "!";
}

// Arrow function
const add = (a, b) => {
  return a + b;
};

console.log(greet("World"));
console.log(add(5, 3));`,
        objective: "Learn how to create and use functions",
        tips: [
          "Functions should have descriptive names",
          "Use arrow functions for short operations",
          "Always return a value when expected"
        ]
      },
      {
        id: 3,
        title: "Arrays and Objects",
        content: "Arrays store lists of items, while objects store key-value pairs.",
        code: `// Arrays
const fruits = ["apple", "banana", "orange"];
fruits.push("grape");

// Objects
const person = {
  name: "Bob",
  age: 30,
  city: "New York"
};

console.log("Fruits:", fruits);
console.log("Person:", person);
console.log("Person's name:", person.name);`,
        objective: "Work with arrays and objects effectively",
        tips: [
          "Use square brackets [] for arrays",
          "Use curly braces {} for objects",
          "Access object properties with dot notation"
        ]
      }
    ]
  }
};

const TutorialPanel: React.FC<TutorialPanelProps> = ({ 
  tutorial = tutorials.javascript, 
  onCodeLoad 
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  const progress = (completedSteps.length / tutorial.steps.length) * 100;
  const step = tutorial.steps[currentStep];

  const nextStep = () => {
    if (currentStep < tutorial.steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const markStepComplete = () => {
    if (!completedSteps.includes(step.id)) {
      setCompletedSteps([...completedSteps, step.id]);
    }
  };

  const loadCode = () => {
    if (step.code && onCodeLoad) {
      onCodeLoad(step.code);
    }
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-primary" />
              <CardTitle className="text-lg">{tutorial.title}</CardTitle>
            </div>
            <Badge variant="secondary">
              {currentStep + 1} of {tutorial.steps.length}
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground">{tutorial.description}</p>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Progress</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="w-full" />
          </div>
        </CardHeader>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-base flex items-center gap-2">
              {completedSteps.includes(step.id) && (
                <CheckCircle2 className="w-4 h-4 text-success" />
              )}
              Step {currentStep + 1}: {step.title}
            </CardTitle>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={prevStep}
                disabled={currentStep === 0}
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={nextStep}
                disabled={currentStep === tutorial.steps.length - 1}
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="prose prose-sm max-w-none">
            <p className="text-foreground leading-relaxed">{step.content}</p>
          </div>

          <Card className="bg-muted/50 border-dashed">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Target className="w-4 h-4 text-info" />
                  <span className="font-medium text-sm">Objective</span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-sm text-muted-foreground">{step.objective}</p>
            </CardContent>
          </Card>

          {step.code && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="font-medium text-sm flex items-center gap-2">
                  <Code className="w-4 h-4" />
                  Example Code
                </h4>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={loadCode}
                  className="gap-2"
                >
                  <Code className="w-4 h-4" />
                  Load in Editor
                </Button>
              </div>
              <div className="bg-code-bg rounded-lg p-4 border border-code-border">
                <pre className="text-sm text-foreground overflow-x-auto">
                  <code>{step.code}</code>
                </pre>
              </div>
            </div>
          )}

          <div className="space-y-2">
            <h4 className="font-medium text-sm">💡 Tips</h4>
            <ul className="space-y-1">
              {step.tips.map((tip, index) => (
                <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex justify-between pt-4 border-t border-border">
            <Button
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 0}
              className="gap-2"
            >
              <ChevronLeft className="w-4 h-4" />
              Previous
            </Button>
            <Button
              variant="outline"
              onClick={markStepComplete}
              disabled={completedSteps.includes(step.id)}
              className="gap-2"
            >
              <CheckCircle2 className="w-4 h-4" />
              {completedSteps.includes(step.id) ? 'Completed' : 'Mark Complete'}
            </Button>
            <Button
              onClick={nextStep}
              disabled={currentStep === tutorial.steps.length - 1}
              className="gap-2 bg-gradient-primary"
            >
              Next
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TutorialPanel;