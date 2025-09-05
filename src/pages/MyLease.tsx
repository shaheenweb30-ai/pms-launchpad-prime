import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar, FileText, Building2, User, Download, Eye, ArrowUpRight, MessageSquare, Phone, Mail } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const MyLease = () => {
  const { toast } = useToast();
  
  // Modal states
  const [showFullLeaseModal, setShowFullLeaseModal] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  const [showDocumentModal, setShowDocumentModal] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState('');
  
  // Contact form state
  const [contactForm, setContactForm] = useState({
    subject: '',
    message: '',
    contactMethod: 'email'
  });

  // Handle View Full Lease
  const handleViewFullLease = () => {
    setShowFullLeaseModal(true);
  };

  // Handle Download PDF
  const handleDownloadPDF = () => {
    // Simulate PDF download
    toast({
      title: "Download Started",
      description: "Your lease agreement PDF is being prepared for download.",
    });
    
    // In a real app, this would trigger an actual PDF download
    setTimeout(() => {
      toast({
        title: "Download Complete",
        description: "Lease agreement PDF has been downloaded to your device.",
      });
    }, 2000);
  };

  // Handle Contact Landlord
  const handleContactLandlord = () => {
    setShowContactModal(true);
  };

  // Handle document viewing
  const handleDocumentView = (documentType: string) => {
    setSelectedDocument(documentType);
    setShowDocumentModal(true);
  };

  // Handle contact form submission
  const handleContactSubmit = () => {
    if (contactForm.subject && contactForm.message) {
      toast({
        title: "Message Sent",
        description: `Your message has been sent to your landlord via ${contactForm.contactMethod}.`,
      });
      setShowContactModal(false);
      setContactForm({ subject: '', message: '', contactMethod: 'email' });
    } else {
      toast({
        title: "Missing Information",
        description: "Please fill in both subject and message fields.",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="space-y-8 p-1">
      {/* Modern Minimal Welcome Header */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-50 via-white to-gray-50/30 p-8 border border-slate-200/50 shadow-sm">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-500/5 to-gray-500/5 opacity-60"></div>
        <div className="relative z-10">
          <div className="flex items-center justify-between">
            <div className="space-y-3">
              <h1 className="text-5xl font-extralight bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent tracking-tight font-google-sans">
                My Lease Agreement
              </h1>
              <p className="text-lg text-slate-600 max-w-2xl font-light leading-relaxed">
                View your lease details, terms, and important dates. Keep track of your rental agreement and access important documents.
              </p>
              <div className="flex items-center gap-6 pt-3">
                <div className="flex items-center gap-2 text-sm text-slate-500">
                  <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
                  <span className="font-medium">Lease Status: Active</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-500">
                  <Calendar className="h-4 w-4" />
                  <span>Expires: Dec 31, 2025</span>
                </div>
              </div>
            </div>
            <div className="hidden lg:flex items-center gap-3">
              <Button 
                variant="outline"
                onClick={handleViewFullLease}
              >
                <Eye className="h-4 w-4 mr-2" />
                View Full Lease
              </Button>
              <Button 
                variant="outline"
                onClick={handleDownloadPDF}
              >
                <Download className="h-4 w-4 mr-2" />
                Download PDF
              </Button>
              <Button 
                onClick={handleContactLandlord}
              >
                <MessageSquare className="h-4 w-4 mr-2" />
                Contact Landlord
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Lease Details Card */}
      <Card className="border-0 bg-white shadow-sm hover:shadow-md transition-all duration-200 rounded-3xl">
        <CardHeader className="border-b border-gray-100 bg-gray-50/50">
          <CardTitle className="flex items-center gap-3 text-lg font-light">
            <div className="p-2 rounded-lg bg-gray-100">
              <FileText className="h-5 w-5 text-gray-600" />
            </div>
            Lease Details
            <Badge variant="secondary" className="ml-auto font-light">Active Agreement</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="text-sm font-light text-gray-600">Property Address</div>
                <div className="flex items-center gap-2 text-black">
                  <Building2 className="h-4 w-4 text-gray-600" />
                  <span className="font-light">Downtown Residences, Unit 5B</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="text-sm font-light text-gray-600">Tenant Name</div>
                <div className="flex items-center gap-2 text-black">
                  <User className="h-4 w-4 text-gray-600" />
                  <span className="font-light">Your Name</span>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="text-sm font-light text-gray-600">Lease Start Date</div>
                <div className="flex items-center gap-2 text-black">
                  <Calendar className="h-4 w-4 text-gray-600" />
                  <span className="font-light">Jan 1, 2025</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="text-sm font-light text-gray-600">Lease End Date</div>
                <div className="flex items-center gap-2 text-black">
                  <Calendar className="h-4 w-4 text-gray-600" />
                  <span className="font-light">Dec 31, 2025</span>
                </div>
              </div>
            </div>
          </div>
          <Separator className="my-6" />
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-sm font-light text-gray-600">Lease Status</span>
              <Badge className="bg-gray-100 text-gray-800 border-gray-200">Active</Badge>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Calendar className="h-4 w-4" />
              <span>12 months remaining</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Additional Lease Information */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="border-0 bg-white shadow-sm hover:shadow-md transition-all duration-200 rounded-3xl">
          <CardHeader className="border-b border-gray-100 bg-gray-50/50">
            <CardTitle className="flex items-center gap-3 text-lg font-light">
              <div className="p-2 rounded-lg bg-gray-100">
                <Calendar className="h-5 w-5 text-gray-600" />
              </div>
              Important Dates
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-light text-gray-600">Rent Due Date</span>
                <span className="font-light text-black">1st of each month</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-light text-gray-600">Grace Period</span>
                <span className="font-light text-black">5 days</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-light text-gray-600">Lease Renewal Notice</span>
                <span className="font-light text-black">60 days before expiry</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 bg-white shadow-sm hover:shadow-md transition-all duration-200 rounded-3xl">
          <CardHeader className="border-b border-gray-100 bg-gray-50/50">
            <CardTitle className="flex items-center gap-3 text-lg font-light">
              <div className="p-2 rounded-lg bg-gray-100">
                <FileText className="h-5 w-5 text-gray-600" />
              </div>
              Documents
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              <Button 
                variant="ghost" 
                className="w-full justify-start text-gray-600 hover:text-black hover:bg-gray-50 font-light"
                onClick={() => handleDocumentView('Lease Agreement')}
              >
                <FileText className="h-4 w-4 mr-3" />
                Lease Agreement (PDF)
                <ArrowUpRight className="h-4 w-4 ml-auto" />
              </Button>
              <Button 
                variant="ghost" 
                className="w-full justify-start text-gray-600 hover:text-black hover:bg-gray-50 font-light"
                onClick={() => handleDocumentView('Property Rules & Regulations')}
              >
                <FileText className="h-4 w-4 mr-3" />
                Property Rules & Regulations
                <ArrowUpRight className="h-4 w-4 ml-auto" />
              </Button>
              <Button 
                variant="ghost" 
                className="w-full justify-start text-gray-600 hover:text-black hover:bg-gray-50 font-light"
                onClick={() => handleDocumentView('Move-in Checklist')}
              >
                <FileText className="h-4 w-4 mr-3" />
                Move-in Checklist
                <ArrowUpRight className="h-4 w-4 ml-auto" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* View Full Lease Modal */}
      <Dialog open={showFullLeaseModal} onOpenChange={setShowFullLeaseModal}>
        <DialogContent className="sm:max-w-[800px] max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Complete Lease Agreement
            </DialogTitle>
            <DialogDescription>
              Full text of your lease agreement with all terms and conditions.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6 py-4">
            <div className="space-y-4">
              <h3 className="text-lg font-light text-black">Lease Agreement</h3>
              <div className="space-y-3 text-sm text-gray-700 leading-relaxed">
                <p><strong>Property:</strong> Downtown Residences, Unit 5B</p>
                <p><strong>Tenant:</strong> Your Name</p>
                <p><strong>Landlord:</strong> Property Management LLC</p>
                <p><strong>Lease Term:</strong> January 1, 2025 - December 31, 2025</p>
                <p><strong>Monthly Rent:</strong> $2,500.00</p>
                <p><strong>Security Deposit:</strong> $2,500.00</p>
              </div>
              
              <div className="space-y-3">
                <h4 className="font-medium text-black">Terms and Conditions:</h4>
                <div className="space-y-2 text-sm text-gray-700">
                  <p>1. Rent is due on the 1st of each month with a 5-day grace period.</p>
                  <p>2. Tenant is responsible for utilities and internet service.</p>
                  <p>3. No pets allowed without written permission.</p>
                  <p>4. Smoking is prohibited in the unit and common areas.</p>
                  <p>5. Tenant must maintain renter's insurance.</p>
                  <p>6. 60-day notice required for lease renewal or termination.</p>
                  <p>7. Landlord responsible for major repairs and maintenance.</p>
                  <p>8. Quiet hours: 10 PM - 7 AM on weekdays, 11 PM - 8 AM on weekends.</p>
                </div>
              </div>
              
              <div className="space-y-3">
                <h4 className="font-medium text-black">Property Rules:</h4>
                <div className="space-y-2 text-sm text-gray-700">
                  <p>• No loud music or disturbances</p>
                  <p>• Parking in designated spaces only</p>
                  <p>• No modifications without permission</p>
                  <p>• Proper disposal of trash and recycling</p>
                  <p>• Report maintenance issues promptly</p>
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowFullLeaseModal(false)}>
              Close
            </Button>
            <Button onClick={handleDownloadPDF}>
              <Download className="h-4 w-4 mr-2" />
              Download PDF
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Contact Landlord Modal */}
      <Dialog open={showContactModal} onOpenChange={setShowContactModal}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              Contact Your Landlord
            </DialogTitle>
            <DialogDescription>
              Send a message to your landlord or property management team.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="contact-method">Contact Method</Label>
              <Select value={contactForm.contactMethod} onValueChange={(value) => setContactForm({...contactForm, contactMethod: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Select contact method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="email">
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      Email
                    </div>
                  </SelectItem>
                  <SelectItem value="phone">
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4" />
                      Phone Call
                    </div>
                  </SelectItem>
                  <SelectItem value="message">
                    <div className="flex items-center gap-2">
                      <MessageSquare className="h-4 w-4" />
                      Text Message
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="subject">Subject</Label>
              <Input
                id="subject"
                placeholder="Brief subject line"
                value={contactForm.subject}
                onChange={(e) => setContactForm({...contactForm, subject: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                placeholder="Type your message here..."
                value={contactForm.message}
                onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
                rows={4}
              />
            </div>
            <div className="bg-gray-50 p-3 rounded-lg">
              <p className="text-sm text-gray-600">
                <strong>Property:</strong> Downtown Residences, Unit 5B
              </p>
              <p className="text-sm text-gray-600">
                <strong>Landlord:</strong> Property Management LLC
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowContactModal(false)}>
              Cancel
            </Button>
            <Button onClick={handleContactSubmit}>
              <MessageSquare className="h-4 w-4 mr-2" />
              Send Message
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Document View Modal */}
      <Dialog open={showDocumentModal} onOpenChange={setShowDocumentModal}>
        <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              {selectedDocument}
            </DialogTitle>
            <DialogDescription>
              View and download this document.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            {selectedDocument === 'Lease Agreement' && (
              <div className="space-y-4">
                <p className="text-sm text-gray-700">
                  This is your complete lease agreement document. It contains all the terms, conditions, and legal obligations for your tenancy.
                </p>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium mb-2">Document Details:</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Document Type: Lease Agreement</li>
                    <li>• Version: 2025.1</li>
                    <li>• Last Updated: January 1, 2025</li>
                    <li>• File Size: 2.3 MB</li>
                    <li>• Format: PDF</li>
                  </ul>
                </div>
              </div>
            )}
            
            {selectedDocument === 'Property Rules & Regulations' && (
              <div className="space-y-4">
                <p className="text-sm text-gray-700">
                  Property rules and regulations that all tenants must follow. These rules help maintain a peaceful and safe living environment.
                </p>
                <div className="space-y-3">
                  <h4 className="font-medium text-black">Key Rules:</h4>
                  <div className="space-y-2 text-sm text-gray-700">
                    <p>• Quiet hours: 10 PM - 7 AM weekdays, 11 PM - 8 AM weekends</p>
                    <p>• No smoking in units or common areas</p>
                    <p>• Pets require written permission and additional deposit</p>
                    <p>• Parking in designated spaces only</p>
                    <p>• No modifications without landlord approval</p>
                    <p>• Proper trash disposal and recycling</p>
                    <p>• Report maintenance issues within 24 hours</p>
                  </div>
                </div>
              </div>
            )}
            
            {selectedDocument === 'Move-in Checklist' && (
              <div className="space-y-4">
                <p className="text-sm text-gray-700">
                  Complete this checklist when moving in to document the condition of the property and avoid disputes later.
                </p>
                <div className="space-y-3">
                  <h4 className="font-medium text-black">Checklist Items:</h4>
                  <div className="space-y-2 text-sm text-gray-700">
                    <p>□ All appliances working properly</p>
                    <p>□ Windows and doors functioning correctly</p>
                    <p>□ Plumbing fixtures in good condition</p>
                    <p>□ Electrical outlets and switches working</p>
                    <p>□ Walls, floors, and ceilings clean and undamaged</p>
                    <p>□ Smoke detectors and safety equipment functional</p>
                    <p>□ Keys and access cards received</p>
                    <p>□ Utilities transferred to tenant name</p>
                  </div>
                </div>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDocumentModal(false)}>
              Close
            </Button>
            <Button onClick={handleDownloadPDF}>
              <Download className="h-4 w-4 mr-2" />
              Download Document
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MyLease;


