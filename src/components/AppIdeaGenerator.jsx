import React, { useState, useEffect } from 'react';
import { AlertCircle, HelpCircle, ChevronDown, ChevronUp, Save, Upload, Clock } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Select } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Tooltip } from '@/components/ui/tooltip';
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
    <Tooltip content={content}>
      <HelpCircle className="h-4 w-4 ml-2 inline-block" />
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
                  {renderTooltip("The general category of your application")}
                </label>
                <Select
                  value={appType}
                  onValueChange={setAppType}
                  placeholder="Select app type"
                >
                  {appTypes.map(type => (
                    <Select.Option key={type} value={type}>{type}</Select.Option>
                  ))}
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Main Functionalities
                  {renderTooltip("Key features of your app")}
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
                  {renderTooltip("The primary language used to develop the app")}
                </label>
                <Select
                  value={programmingLanguage}
                  onValueChange={setProgrammingLanguage}
                  placeholder="Select programming language"
                >
                  {programmingLanguages.map(lang => (
                    <Select.Option key={lang} value={lang}>{lang}</Select.Option>
                  ))}
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
                      {renderTooltip("The software framework used for development")}
                    </label>
                    <Select
                      value={framework}
                      onValueChange={setFramework}
                      placeholder="Select framework"
                      disabled={!programmingLanguage}
                    >
                      {programmingLanguage && frameworkOptions[programmingLanguage].map(fw => (
                        <Select.Option key={fw} value={fw}>{fw}</Select.Option>
                      ))}
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Architecture
                      {renderTooltip("The overall structure and organization of your app")}
                    </label>
                    <Select
                      value={architecture}
                      onValueChange={setArchitecture}
                      placeholder="Select architecture"
                    >
                      {architectures.map(arch => (
                        <Select.Option key={arch} value={arch}>{arch}</Select.Option>
                      ))}
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Complexity Level (1-10)
                      {renderTooltip("Estimated complexity of your app")}
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
                      {renderTooltip("Whether the app requires user login")}
                    </label>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Data Storage
                      {renderTooltip("How data will be stored in your app")}
                    </label>
                    <Select
                      value={dataStorage}
                      onValueChange={setDataStorage}
                      placeholder="Select data storage option"
                    >
                      {dataStorageOptions.map(option => (
                        <Select.Option key={option} value={option}>{option}</Select.Option>
                      ))}
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Target Audience
                      {renderTooltip("The primary users of your app")}
                    </label>
                    <Input
                      placeholder="e.g., young professionals"
                      value={targetAudience}
                      onChange={(e) => setTargetAudience(e.target.value)}
                    />
                  </div>
                </>
              )}

              <div className="flex space-x-4">
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