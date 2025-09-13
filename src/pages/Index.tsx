import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import CodeEditor from '@/components/CodeEditor';
import TutorialPanel from '@/components/TutorialPanel';
import ExerciseGenerator from '@/components/ExerciseGenerator';
import { Code2, BookOpen, Zap, GraduationCap, Users, Trophy } from 'lucide-react';

const Index = () => {
  const [editorCode, setEditorCode] = useState('');

  const handleCodeLoad = (code: string) => {
    setEditorCode(code);
  };

  const stats = [
    { icon: Users, label: 'Active Learners', value: '2,431' },
    { icon: Trophy, label: 'Exercises Completed', value: '15,672' },
    { icon: Code2, label: 'Lines of Code', value: '89,324' },
    { icon: GraduationCap, label: 'Tutorials Available', value: '48' },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-card/50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="flex items-center justify-center w-8 h-8 bg-gradient-primary rounded-lg">
                <Code2 className="w-5 h-5 text-primary-foreground" />
              </div>
              <h1 className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                CodeLearn AI
              </h1>
            </div>
            <nav className="hidden md:flex items-center space-x-6">
              <a href="#tutorials" className="text-sm font-medium hover:text-primary transition-colors">
                Tutorials
              </a>
              <a href="#exercises" className="text-sm font-medium hover:text-primary transition-colors">
                Exercises
              </a>
              <a href="#editor" className="text-sm font-medium hover:text-primary transition-colors">
                Code Editor
              </a>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-b from-background to-muted/20">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent">
              Master Programming with AI-Powered Learning
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Interactive code analysis, real-time error detection, personalized tutorials, 
              and intelligent exercise generation - all in one platform.
            </p>
            
            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
              {stats.map((stat, index) => (
                <Card key={index} className="text-center">
                  <CardContent className="p-4">
                    <stat.icon className="w-6 h-6 mx-auto mb-2 text-primary" />
                    <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                    <div className="text-xs text-muted-foreground">{stat.label}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="container mx-auto px-6">
          <Tabs defaultValue="editor" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="editor" className="flex items-center gap-2">
                <Code2 className="w-4 h-4" />
                Code Editor
              </TabsTrigger>
              <TabsTrigger value="tutorials" className="flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                Tutorials
              </TabsTrigger>
              <TabsTrigger value="exercises" className="flex items-center gap-2">
                <Zap className="w-4 h-4" />
                Exercises
              </TabsTrigger>
            </TabsList>

            <TabsContent value="editor" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <CodeEditor 
                    initialCode={editorCode}
                    onCodeChange={setEditorCode}
                    title="Interactive Code Editor"
                  />
                </div>
                <div className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Quick Actions</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <p className="text-sm text-muted-foreground">
                        Use the tabs above to access tutorials and exercises, or start coding directly in the editor.
                      </p>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-success rounded-full"></div>
                          <span>Real-time error detection</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-info rounded-full"></div>
                          <span>Intelligent code suggestions</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-primary rounded-full"></div>
                          <span>Interactive execution</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="tutorials" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <TutorialPanel onCodeLoad={handleCodeLoad} />
                </div>
                <div className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Learning Path</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span>JavaScript Basics</span>
                          <span className="text-success">✓</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span>Functions & Scope</span>
                          <span className="text-muted-foreground">○</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span>Objects & Arrays</span>
                          <span className="text-muted-foreground">○</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span>Async Programming</span>
                          <span className="text-muted-foreground">○</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="exercises" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <ExerciseGenerator onLoadExercise={handleCodeLoad} />
                </div>
                <div className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Your Progress</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Exercises Completed</span>
                          <span className="font-medium">12/50</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div className="bg-gradient-primary h-2 rounded-full" style={{ width: '24%' }}></div>
                        </div>
                      </div>
                      <div className="space-y-1 text-sm">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-success rounded-full"></div>
                          <span>Beginner: 8/15</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-warning rounded-full"></div>
                          <span>Intermediate: 4/20</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-destructive rounded-full"></div>
                          <span>Advanced: 0/15</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  );
};

export default Index;
