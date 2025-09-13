import React, { useState, useEffect } from 'react';
import Editor from '@monaco-editor/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Play, RotateCcw, CheckCircle2, XCircle, AlertCircle } from 'lucide-react';

interface CodeEditorProps {
  initialCode?: string;
  language?: string;
  onCodeChange?: (code: string) => void;
  title?: string;
}

interface CodeError {
  line: number;
  message: string;
  severity: 'error' | 'warning' | 'info';
}

const CodeEditor: React.FC<CodeEditorProps> = ({
  initialCode = '// Welcome to the Code Learning Assistant!\n// Start typing your code here\n\nfunction greet(name) {\n  return `Hello, ${name}!`;\n}\n\nconsole.log(greet("World"));',
  language = 'javascript',
  onCodeChange,
  title = 'Code Editor'
}) => {
  const [code, setCode] = useState(initialCode);
  const [errors, setErrors] = useState<CodeError[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [output, setOutput] = useState<string[]>([]);

  // Simple error detection for JavaScript
  const analyzeCode = (codeToAnalyze: string) => {
    const detectedErrors: CodeError[] = [];
    const lines = codeToAnalyze.split('\n');

    lines.forEach((line, index) => {
      const lineNumber = index + 1;
      
      // Check for missing semicolons (simple heuristic)
      if (line.trim() && 
          !line.trim().endsWith(';') && 
          !line.trim().endsWith('{') && 
          !line.trim().endsWith('}') && 
          !line.trim().startsWith('//') && 
          !line.trim().startsWith('*') &&
          line.includes('=') && 
          !line.includes('function') &&
          !line.includes('if') &&
          !line.includes('for') &&
          !line.includes('while')) {
        detectedErrors.push({
          line: lineNumber,
          message: 'Consider adding a semicolon at the end of this statement',
          severity: 'warning'
        });
      }

      // Check for console.log statements
      if (line.includes('console.log')) {
        detectedErrors.push({
          line: lineNumber,
          message: 'Console.log found - remember to remove debug statements in production',
          severity: 'info'
        });
      }

      // Check for undefined variables (simple check)
      if (line.includes('undefined') && !line.includes('//')) {
        detectedErrors.push({
          line: lineNumber,
          message: 'Potential undefined variable usage',
          severity: 'error'
        });
      }
    });

    setErrors(detectedErrors);
  };

  const handleCodeChange = (value: string | undefined) => {
    if (value !== undefined) {
      setCode(value);
      onCodeChange?.(value);
      analyzeCode(value);
    }
  };

  const runCode = () => {
    setIsRunning(true);
    setOutput([]);
    
    // Simulate code execution with output
    setTimeout(() => {
      try {
        // Simple JavaScript execution simulation
        const result = eval(code);
        setOutput(['Code executed successfully!', `Result: ${result || 'undefined'}`]);
      } catch (error) {
        setOutput([`Error: ${(error as Error).message}`]);
      }
      setIsRunning(false);
    }, 1000);
  };

  const resetCode = () => {
    setCode(initialCode);
    setOutput([]);
    setErrors([]);
  };

  const getErrorIcon = (severity: string) => {
    switch (severity) {
      case 'error':
        return <XCircle className="w-4 h-4 text-destructive" />;
      case 'warning':
        return <AlertCircle className="w-4 h-4 text-warning" />;
      case 'info':
        return <CheckCircle2 className="w-4 h-4 text-info" />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-4">
      <Card className="overflow-hidden">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-lg font-semibold">{title}</CardTitle>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={resetCode}
              className="gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              Reset
            </Button>
            <Button
              onClick={runCode}
              disabled={isRunning}
              className="gap-2 bg-gradient-primary"
            >
              <Play className="w-4 h-4" />
              {isRunning ? 'Running...' : 'Run Code'}
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="h-96 border-t border-border">
            <Editor
              height="384px"
              defaultLanguage={language}
              value={code}
              onChange={handleCodeChange}
              theme="vs-dark"
              options={{
                minimap: { enabled: false },
                scrollBeyondLastLine: false,
                fontSize: 14,
                lineNumbers: 'on',
                rulers: [80],
                wordWrap: 'on',
                automaticLayout: true,
              }}
            />
          </div>
        </CardContent>
      </Card>

      {/* Analysis Panel */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            Code Analysis
            <Badge variant="secondary">{errors.length} issues found</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {errors.length === 0 ? (
            <div className="flex items-center gap-2 text-success">
              <CheckCircle2 className="w-4 h-4" />
              <span>No issues detected - great job!</span>
            </div>
          ) : (
            errors.map((error, index) => (
              <div key={index} className="flex items-start gap-3 p-3 rounded-lg border border-border bg-muted/50">
                {getErrorIcon(error.severity)}
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-medium">Line {error.line}</span>
                    <Badge variant={error.severity === 'error' ? 'destructive' : 'secondary'} className="text-xs">
                      {error.severity}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{error.message}</p>
                </div>
              </div>
            ))
          )}
        </CardContent>
      </Card>

      {/* Output Panel */}
      {output.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Output</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-code-bg rounded-lg p-4 border border-code-border">
              <pre className="text-sm text-foreground whitespace-pre-wrap">
                {output.join('\n')}
              </pre>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default CodeEditor;