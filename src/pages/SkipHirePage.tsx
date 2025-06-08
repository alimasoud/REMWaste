import { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, CheckCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import { getSkips } from '@/api/skipController';
import type { Skip } from '@/types/Skip';

const SkipHirePage = () => {
  const [selectedSkipId, setSelectedSkipId] = useState<number | null>(null);
  const [skips, setSkips] = useState<Skip[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getSkips();
        setSkips(data);
        if (data.length > 0) {
          setSelectedSkipId(data[0].id); 
        }
      } catch (err) {
        console.error('Error fetching skips:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

    // steps for the progress bar
  const steps = [
    { id: 1, name: 'Postcode', completed: true },
    { id: 2, name: 'Waste Type', completed: true },
    { id: 3, name: 'Select Skip', completed: false, current: true },
    { id: 4, name: 'Permit Check', completed: false },
    { id: 5, name: 'Choose Date', completed: false },
    { id: 6, name: 'Payment', completed: false },
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Loading skip options...</p>
      </div>
    );
  }

  if (skips.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <AlertTriangle className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">No Skip Options Available</h2>
          <p className="text-gray-600 mb-4">There are currently no skip options available for your area.</p>
          <Button onClick={() => window.location.reload()} className="bg-blue-600 hover:bg-blue-700">
            Refresh
          </Button>
        </div>
      </div>
    );
  }

  const getPriceWithVat = (skip: Skip) => {
    return (skip.price_before_vat + skip.vat).toFixed(2);
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Progress Steps */}
      <div className="bg-white border-b shadow-sm w-full">
        <div className=" px-2 sm:px-4 py-3 sm:py-4">
          <div className="block sm:hidden">
            <div className="flex items-center justify-center space-x-1">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${
                    step.completed 
                      ? 'bg-blue-600 text-white' 
                      : step.current 
                        ? 'bg-blue-100 text-blue-600 border-2 border-blue-600' 
                        : 'bg-gray-200 text-gray-500'
                  }`}>
                    {step.completed ? <CheckCircle className="w-3 h-3" /> : step.id}
                  </div>
                  {index < steps.length - 1 && (
                    <div className="w-4 h-0.5 bg-gray-300 mx-1"></div>
                  )}
                </div>
              ))}
            </div>
            <div className="text-center mt-2">
              <span className="text-sm font-medium text-blue-600">
                Step {steps.find(s => s.current)?.id} of {steps.length}: {steps.find(s => s.current)?.name}
              </span>
            </div>
          </div>

          <div className="hidden sm:flex items-center w-full justify-center">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center flex-shrink-0">
                <div className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    step.completed 
                      ? 'bg-blue-600 text-white' 
                      : step.current 
                        ? 'bg-blue-100 text-blue-600 border-2 border-blue-600' 
                        : 'bg-gray-200 text-gray-500'
                  }`}>
                    {step.completed ? <CheckCircle className="w-5 h-5" /> : step.id}
                  </div>
                  <span className={`ml-2 text-sm font-medium ${
                    step.current ? 'text-blue-600' : step.completed ? 'text-gray-900' : 'text-gray-500'
                  }`}>
                    {step.name}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <ChevronRight className="w-4 h-4 text-gray-400 ml-4" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

     
      <div className="w-full max-w-[2000px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
            Choose Your Skip Size
          </h1>
          <p className="text-base sm:text-lg text-gray-600 px-4">
            Select the skip size that best suits your needs
          </p>
        </div>

        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {skips.map((skip) => (
            <Card
              key={skip.id}
              className={`cursor-pointer transition-all duration-300 ${
                selectedSkipId === skip.id
                  ? 'ring-2 ring-blue-500 shadow-lg scale-[1.02]'
                  : 'hover:shadow-md'
              }`}
              onClick={() => setSelectedSkipId(skip.id)}
            >
              <div className="relative">
                <div className="aspect-video bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center">
                  <div className="bg-yellow-500 rounded-lg shadow-lg w-16 h-10 sm:w-20 sm:h-12 flex items-center justify-center">
                    <div className="text-gray-800 font-bold text-xs text-center leading-tight">
                      <div>WE WANT</div>
                      <div>WASTE</div>
                    </div>
                  </div>
                </div>

                <Badge className="absolute top-2 right-2 bg-blue-600 hover:bg-blue-700 text-xs sm:text-sm">
                  {skip.size}-yard
                </Badge>

                {selectedSkipId === skip.id && (
                  <div className="absolute top-2 left-2">
                    <CheckCircle className="w-5 h-5 text-green-500 bg-white rounded-full" />
                  </div>
                )}
              </div>

              <CardContent className="p-4">
                <div className="mb-3">
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-1">
                    {skip.size}-Yard Skip
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600">
                    Hire Period: {skip.hire_period_days} days
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                  <div className="flex flex-col">
                    <div className="text-xl sm:text-2xl font-bold text-blue-600">
                      £{getPriceWithVat(skip)}
                    </div>
                    <div className="text-xs text-gray-500">
                      £{skip.price_before_vat.toFixed(2)} + VAT (£{skip.vat.toFixed(2)})
                    </div>
                  </div>
                  <Button
                    variant='outline'
                    size="sm"
                    className={`w-full sm:w-auto text-xs sm:text-sm ${
                      selectedSkipId === skip.id ? 'bg-blue-600 hover:bg-blue-700' : ''
                    }`}
                  >
                    {selectedSkipId === skip.id ? 'Selected' : 'Select This Skip'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bottom Summary */}
        {selectedSkipId && (
          <div className="bg-white rounded-lg shadow-sm border p-4 mt-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              {(() => {
                const selectedSkip = skips.find((s) => s.id === selectedSkipId)!;
                return (
                  <>
                    <div className="text-base sm:text-lg font-semibold text-gray-900">
                      {selectedSkip.size}-Yard Skip
                    </div>
                    <div className="text-xl sm:text-2xl font-bold text-blue-600">
                      £{getPriceWithVat(selectedSkip)}
                    </div>
                    <div className="text-xs sm:text-sm text-gray-600">
                      Hire Period: {selectedSkip.hire_period_days} days
                    </div>
                  </>
                );
              })()}
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mt-6">
          <Button variant="outline" className="w-full sm:w-auto order-2 sm:order-1">
            <ChevronLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <Button variant="outline" className="bg-blue-600 hover:bg-blue-700 w-full sm:w-auto order-1 sm:order-2">
            Continue
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        </div>

        {/* Disclaimer */}
        <p className="text-xs text-gray-500 text-center mt-4 px-2 leading-relaxed">
          Imagery and information shown throughout this website may not reflect the exact shape or size specification.
          Colours may vary. Options and/or accessories may be featured at additional cost.
        </p>
      </div>
    </div>
  );
};

export default SkipHirePage;
