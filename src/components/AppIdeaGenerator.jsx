import React, { useState, useEffect } from 'react';
import { AlertCircle, HelpCircle, ChevronDown, ChevronUp, Save, Upload, Clock } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Checkbox } from '@/components/ui/checkbox';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const AppIdeaGenerator = () => {
  const [appType, setAppType] = useState('');
  const [mainFunctionalities, setMainFunctionalities] = useState([]);
  const [programmingLanguage, setProgrammingLanguage] = useState('');
  const [framework, setFramework] = useState('');
  const [architecture, setArchitecture] = useState('');
  const [complexity, setComplexity] = useState(5);
  const [includeAuth, setIncludeAuth] = useState(false);
  const [dataStorage, setDataStorage] = useState('');
  const [targetAudience, setTargetAudience] = useState('');
  const [generatedPrompt, setGeneratedPrompt] = useState('');
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [promptHistory, setPromptHistory] = useState([]);
  const [activeTab, setActiveTab] = useState('generator');
  const [ideaInput, setIdeaInput] = useState('');

  const appTypes = ['Web App', 'Mobile App', 'Desktop App', 'IoT App', 'AI/ML App'];
  const programmingLanguages = ['JavaScript', 'Python', 'Java', 'C#', 'Ruby', 'Go', 'Swift'];
  const frameworkOptions = {
    JavaScript: ['React', 'Angular', 'Vue.js', 'Node.js'],
    Python: ['Django', 'Flask', 'FastAPI'],
    Java: ['Spring Boot', 'JavaServer Faces'],
    'C#': ['ASP.NET Core', 'Xamarin'],
    Ruby: ['Ruby on Rails', 'Sinatra'],
    Go: ['Gin', 'Echo'],
    Swift: ['SwiftUI', 'UIKit']
  };
  const architectures = ['Microservices', 'Monolithic', 'Serverless', 'Event-Driven', 'Layered'];
  const dataStorageOptions = ['SQL Database', 'NoSQL Database', 'File System', 'Cloud Storage', 'In-Memory'];
  const functionalityOptions = [
    'User Management', 'Data Analytics', 'Social Networking', 'E-commerce', 
    'Content Management', 'Real-time Communication', 'Task Management', 
    'Geolocation Services', 'File Sharing', 'Payment Processing'
  ];

  useEffect(() => {
    if (programmingLanguage) {
      setFramework('');
    }
  }, [programmingLanguage]);

  const generatePrompt = () => {
    let prompt = `Analyze the provided folders and files to create a functional ${appType} that `;
    prompt += mainFunctionalities.length > 0 ? `includes ${mainFunctionalities.join(', ')}. ` : '';
    prompt += `The app should be written in ${programmingLanguage} `;
    prompt += framework ? `using ${framework} framework ` : '';
    prompt += architecture ? `and follow ${architecture} architecture. ` : '';
    prompt += `The app's complexity level is ${complexity}/10. `;
    prompt += includeAuth ? "Include user authentication and authorization. " : "";
    prompt += dataStorage ? `Use ${dataStorage} for data storage. ` : "";
    prompt += targetAudience ? `The target audience is ${targetAudience}. ` : "";
    setGeneratedPrompt(prompt);
    setPromptHistory([...promptHistory, { timestamp: new Date(), prompt }]);
  };

  const renderTooltip = (content) => (
    <Tooltip>
      <TooltipTrigger>
        <HelpCircle className="h-4 w-4 ml-2 inline-block" />
      </TooltipTrigger>
      <TooltipContent>
        {content}
      </TooltipContent>
    </Tooltip>
  );

  const exportConfig = () => {
    const config = {
      appType, mainFunctionalities, programmingLanguage, framework, architecture,
      complexity, includeAuth, dataStorage, targetAudience
    };
    const blob = new Blob([JSON.stringify(config)], { type: 'application/json' });
    const href = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = href;
    link.download = 'app-idea-config.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const importConfig = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      const config = JSON.parse(e.target.result);
      setAppType(config.appType);
      setMainFunctionalities(config.mainFunctionalities);
      setProgrammingLanguage(config.programmingLanguage);
      setFramework(config.framework);
      setArchitecture(config.architecture);
      setComplexity(config.complexity);
      setIncludeAuth(config.includeAuth);
      setDataStorage(config.dataStorage);
      setTargetAudience(config.targetAudience);
    };
    reader.readAsText(file);
  };

  const autofill = () => {
    // Implement autofill logic here
    // For now, just set some default values
    setAppType('Web App');
    setMainFunctionalities(['User Management', 'E-commerce']);
    setProgrammingLanguage('JavaScript');
    setFramework('React');
    setArchitecture('Microservices');
    setComplexity(7);
    setIncludeAuth(true);
    setDataStorage('SQL Database');
    setTargetAudience('General Public');
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Advanced App Idea Generator</h1>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="generator">Generator</TabsTrigger>
          <TabsTrigger value="history">Prompt History</TabsTrigger>
        </TabsList>
        
        <TabsContent value="generator">
          <Card className="p-6">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-1">
                  App Type
                  {renderTooltip("The general category of your application. Choose from Web App, Mobile App, Desktop App, IoT App, or AI/ML App.")}
                </label>
                <Select
                  value={appType}
                  onValueChange={setAppType}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select app type" />
                  </SelectTrigger>
                  <SelectContent>
                    {appTypes.map(type => (
                      <SelectItem key={type} value={type}>{type}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Main Functionalities
                  {renderTooltip("Key features of your app. Select multiple functionalities that your app will include.")}
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {functionalityOptions.map(func => (
                    <div key={func} className="flex items-center">
                      <Checkbox
                        id={func}
                        checked={mainFunctionalities.includes(func)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setMainFunctionalities([...mainFunctionalities, func]);
                          } else {
                            setMainFunctionalities(mainFunctionalities.filter(f => f !== func));
                          }
                        }}
                      />
                      <label htmlFor={func} className="ml-2 text-sm">{func}</label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Programming Language
                  {renderTooltip("The primary language used to develop the app. Choose from JavaScript, Python, Java, C#, Ruby, Go, or Swift.")}
                </label>
                <Select
                  value={programmingLanguage}
                  onValueChange={setProgrammingLanguage}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select programming language" />
                  </SelectTrigger>
                  <SelectContent>
                    {programmingLanguages.map(lang => (
                      <SelectItem key={lang} value={lang}>{lang}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Button 
                onClick={() => setShowAdvanced(!showAdvanced)}
                variant="outline"
                className="w-full"
              >
                {showAdvanced ? "Hide Advanced Options" : "Show Advanced Options"}
                {showAdvanced ? <ChevronUp className="ml-2 h-4 w-4" /> : <ChevronDown className="ml-2 h-4 w-4" />}
              </Button>

              {showAdvanced && (
                <>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Framework
                      {renderTooltip("The software framework used for development. Choose a framework based on the selected programming language.")}
                    </label>
                    <Select
                      value={framework}
                      onValueChange={setFramework}
                      disabled={!programmingLanguage}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select framework" />
                      </SelectTrigger>
                      <SelectContent>
                        {programmingLanguage && frameworkOptions[programmingLanguage].map(fw => (
                          <SelectItem key={fw} value={fw}>{fw}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Architecture
                      {renderTooltip("The overall structure and organization of your app. Choose from Microservices, Monolithic, Serverless, Event-Driven, or Layered.")}
                    </label>
                    <Select
                      value={architecture}
                      onValueChange={setArchitecture}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select architecture" />
                      </SelectTrigger>
                      <SelectContent>
                        {architectures.map(arch => (
                          <SelectItem key={arch} value={arch}>{arch}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Complexity Level (1-10)
                      {renderTooltip("Estimated complexity of your app on a scale of 1 to 10.")}
                    </label>
                    <Slider
                      min={1}
                      max={10}
                      step={1}
                      value={[complexity]}
                      onValueChange={(value) => setComplexity(value[0])}
                    />
                    <span className="text-sm text-gray-500">{complexity}</span>
                  </div>

                  <div className="flex items-center">
                    <Switch
                      checked={includeAuth}
                      onCheckedChange={setIncludeAuth}
                      id="auth-switch"
                    />
                    <label htmlFor="auth-switch" className="ml-2 text-sm font-medium">
                      Include Authentication
                      {renderTooltip("Whether the app requires user login and authentication features.")}
                    </label>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Data Storage
                      {renderTooltip("How data will be stored in your app. Choose from SQL Database, NoSQL Database, File System, Cloud Storage, or In-Memory.")}
                    </label>
                    <Select
                      value={dataStorage}
                      onValueChange={setDataStorage}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select data storage option" />
                      </SelectTrigger>
                      <SelectContent>
                        {dataStorageOptions.map(option => (
                          <SelectItem key={option} value={option}>{option}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Target Audience
                      {renderTooltip("The primary users of your app. Specify the target audience for your app.")}
                    </label>
                    <Input
                      placeholder="e.g., young professionals"
                      value={targetAudience}
                      onChange={(e) => setTargetAudience(e.target.value)}
                    />
                  </div>
                </>
              )}

              <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
                <Button onClick={generatePrompt}>Generate Prompt</Button>
                <Button onClick={exportConfig} variant="outline">
                  <Save className="mr-2 h-4 w-4" />
                  Export Config
                </Button>
                <Button variant="outline" className="relative">
                  <input
                    type="file"
                    onChange={importConfig}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <Upload className="mr-2 h-4 w-4" />
                  Import Config
                </Button>
                <Button onClick={autofill} variant="outline">
                  Autofill
                </Button>
              </div>

              {generatedPrompt && (
                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Generated Prompt</AlertTitle>
                  <AlertDescription>{generatedPrompt}</AlertDescription>
                </Alert>
              )}
            </div>
          </Card>
        </TabsContent>
        
        <TabsContent value="history">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Prompt History</h2>
            {promptHistory.length === 0 ? (
              <p>No prompts generated yet.</p>
            ) : (
              <ul className="space-y-4">
                {promptHistory.map((item, index) => (
                  <li key={index} className="border-b pb-2">
                    <p className="text-sm text-gray-500">
                      <Clock className="inline-block mr-1 h-4 w-4" />
                      {item.timestamp.toLocaleString()}
                    </p>
                    <p>{item.prompt}</p>
                  </li>
                ))}
              </ul>
            )}
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AppIdeaGenerator;