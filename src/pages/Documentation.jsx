import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { fetchDocumentation } from '@/utils/documentation';

const Documentation = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [documentation, setDocumentation] = useState([]);
  const [filteredDocs, setFilteredDocs] = useState([]);

  useEffect(() => {
    const loadDocumentation = async () => {
      const docs = await fetchDocumentation();
      setDocumentation(docs);
      setFilteredDocs(docs);
    };

    loadDocumentation();
  }, []);

  useEffect(() => {
    const filtered = documentation.filter(doc =>
      doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredDocs(filtered);
  }, [searchTerm, documentation]);

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Documentation</h1>
      <Input
        placeholder="Search documentation..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-4"
      />
      <Tabs>
        <TabsList className="mb-4">
          {filteredDocs.map((doc, index) => (
            <TabsTrigger key={index} value={doc.title}>
              {doc.title}
            </TabsTrigger>
          ))}
        </TabsList>
        {filteredDocs.map((doc, index) => (
          <TabsContent key={index} value={doc.title}>
            <Card className="p-6 mb-4">
              <h2 className="text-2xl font-semibold mb-2">{doc.title}</h2>
              <p className="mb-4">{doc.description}</p>
              {doc.examples && (
                <div className="mb-4">
                  <h3 className="text-xl font-semibold mb-2">Examples</h3>
                  <pre className="bg-gray-100 p-4 rounded">{doc.examples}</pre>
                </div>
              )}
              {doc.notes && (
                <Alert>
                  <AlertTitle>Note</AlertTitle>
                  <AlertDescription>{doc.notes}</AlertDescription>
                </Alert>
              )}
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default Documentation;