import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CreditCard, Download, Eye, ArrowUpRight, Calendar, DollarSign, CheckCircle, Clock, FileText, Banknote, CreditCard as CreditCardIcon } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useCurrency } from '@/contexts/CurrencyContext';

const samplePayments = [
  { id: 'pmt-001', date: '2025-01-01', amount: 1200, status: 'paid' },
  { id: 'pmt-002', date: '2025-02-01', amount: 1200, status: 'paid' },
  { id: 'pmt-003', date: '2025-03-01', amount: 1200, status: 'pending' }
];

const PaymentHistory = () => {
  const { toast } = useToast();
  const { formatCurrency } = useCurrency();
  
  // Modal states
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showReceiptModal, setShowReceiptModal] = useState(false);
  const [showAllReceiptsModal, setShowAllReceiptsModal] = useState(false);
  const [showAllPaymentsModal, setShowAllPaymentsModal] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<any>(null);
  
  // Payment form state
  const [paymentForm, setPaymentForm] = useState({
    amount: '',
    paymentMethod: 'credit_card',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    nameOnCard: ''
  });

  const totalPaid = samplePayments.filter(p => p.status === 'paid').reduce((sum, p) => sum + p.amount, 0);
  const pendingAmount = samplePayments.filter(p => p.status === 'pending').reduce((sum, p) => sum + p.amount, 0);

  // Handle Export Records
  const handleExportRecords = () => {
    toast({
      title: "Export Started",
      description: "Your payment records are being prepared for download.",
    });
    
    setTimeout(() => {
      toast({
        title: "Export Complete",
        description: "Payment history CSV file has been downloaded to your device.",
      });
    }, 2000);
  };

  // Handle View All Receipts
  const handleViewAllReceipts = () => {
    setShowAllReceiptsModal(true);
  };

  // Handle Make Payment
  const handleMakePayment = () => {
    setPaymentForm({
      amount: pendingAmount.toString(),
      paymentMethod: 'credit_card',
      cardNumber: '',
      expiryDate: '',
      cvv: '',
      nameOnCard: ''
    });
    setShowPaymentModal(true);
  };

  // Handle View Receipt
  const handleViewReceipt = (payment: any) => {
    setSelectedPayment(payment);
    setShowReceiptModal(true);
  };

  // Handle View All Payments
  const handleViewAllPayments = () => {
    setShowAllPaymentsModal(true);
  };

  // Handle Payment Submission
  const handlePaymentSubmit = () => {
    if (paymentForm.amount && paymentForm.cardNumber && paymentForm.expiryDate && paymentForm.cvv && paymentForm.nameOnCard) {
      toast({
        title: "Payment Processing",
        description: `Payment of ${formatCurrency(parseFloat(paymentForm.amount))} is being processed.`,
      });
      
      setTimeout(() => {
        toast({
          title: "Payment Successful",
          description: "Your payment has been processed successfully. Receipt will be sent to your email.",
        });
        setShowPaymentModal(false);
        setPaymentForm({ amount: '', paymentMethod: 'credit_card', cardNumber: '', expiryDate: '', cvv: '', nameOnCard: '' });
      }, 3000);
    } else {
      toast({
        title: "Missing Information",
        description: "Please fill in all required payment fields.",
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
                Payment History
              </h1>
              <p className="text-lg text-slate-600 max-w-2xl font-light leading-relaxed">
                Track your rent payments, view receipts, and monitor your payment history. Keep records of all transactions for your records.
              </p>
              <div className="flex items-center gap-6 pt-3">
                <div className="flex items-center gap-2 text-sm text-slate-500">
                  <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
                  <span className="font-medium">Total Paid: ${totalPaid.toLocaleString()}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-500">
                  <Calendar className="h-4 w-4" />
                  <span>{samplePayments.length} payments recorded</span>
                </div>
              </div>
            </div>
            <div className="hidden lg:flex items-center gap-3">
              <Button 
                variant="outline"
                onClick={handleExportRecords}
              >
                <Download className="h-4 w-4 mr-2" />
                Export Records
              </Button>
              <Button 
                variant="outline"
                onClick={handleViewAllReceipts}
              >
                <Eye className="h-4 w-4 mr-2" />
                View All Receipts
              </Button>
              <Button 
                onClick={handleMakePayment}
              >
                <CreditCard className="h-4 w-4 mr-2" />
                Make Payment
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Summary Cards */}
      <div className="grid gap-6 md:grid-cols-3">
        <Card className="group hover:shadow-lg transition-all duration-200 transform hover:-translate-y-1 border-0 bg-white shadow-sm hover:shadow-md rounded-3xl">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-light text-gray-600">
              Total Paid
            </CardTitle>
            <div className="p-2 rounded-lg bg-gray-50 group-hover:bg-gray-100 transition-colors duration-200">
              <CheckCircle className="h-5 w-5 text-gray-600" />
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="text-3xl font-extralight text-black">${totalPaid.toLocaleString()}</div>
            <div className="space-y-2">
              <div className="flex items-center text-sm text-gray-600">
                <DollarSign className="h-4 w-4 text-gray-600 mr-2" />
                <span className="font-medium">Completed payments</span>
              </div>
              <div className="text-xs text-gray-500">All successful transactions</div>
            </div>
          </CardContent>
        </Card>

        <Card className="group hover:shadow-lg transition-all duration-200 transform hover:-translate-y-1 border-0 bg-white shadow-sm hover:shadow-md rounded-3xl">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-light text-gray-600">
              Pending Amount
            </CardTitle>
            <div className="p-2 rounded-lg bg-gray-50 group-hover:bg-gray-100 transition-colors duration-200">
              <Clock className="h-5 w-5 text-gray-600" />
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="text-3xl font-extralight text-black">${pendingAmount.toLocaleString()}</div>
            <div className="space-y-2">
              <div className="flex items-center text-sm text-gray-600">
                <Calendar className="h-4 w-4 text-gray-600 mr-2" />
                <span className="font-medium">Awaiting payment</span>
              </div>
              <div className="text-xs text-gray-500">Outstanding balance</div>
            </div>
          </CardContent>
        </Card>

        <Card className="group hover:shadow-lg transition-all duration-200 transform hover:-translate-y-1 border-0 bg-white shadow-sm hover:shadow-md rounded-3xl">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-light text-gray-600">
              Payment Count
            </CardTitle>
            <div className="p-2 rounded-lg bg-gray-50 group-hover:bg-gray-100 transition-colors duration-200">
              <CreditCard className="h-5 w-5 text-gray-600" />
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="text-3xl font-extralight text-black">{samplePayments.length}</div>
            <div className="space-y-2">
              <div className="flex items-center text-sm text-gray-600">
                <Calendar className="h-4 w-4 text-gray-600 mr-2" />
                <span className="font-medium">Total transactions</span>
              </div>
              <div className="text-xs text-gray-500">Payment history records</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Payment History Table */}
      <Card className="border-0 bg-white shadow-sm hover:shadow-md transition-all duration-200 rounded-3xl">
        <CardHeader className="border-b border-gray-100 bg-gray-50/50">
          <CardTitle className="flex items-center gap-3 text-lg font-light">
            <div className="p-2 rounded-lg bg-gray-100">
              <CreditCard className="h-5 w-5 text-gray-600" />
            </div>
            Payment History
            <Badge variant="secondary" className="ml-auto font-light">{samplePayments.length} payments</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableCaption className="text-gray-500 font-light">Recent rent payments and transaction history</TableCaption>
            <TableHeader>
              <TableRow className="border-gray-100">
                <TableHead className="font-light text-gray-600">Date</TableHead>
                <TableHead className="font-light text-gray-600">Amount</TableHead>
                <TableHead className="font-light text-gray-600">Status</TableHead>
                <TableHead className="text-right font-light text-gray-600">Receipt</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {samplePayments.map((p) => (
                <TableRow key={p.id} className="border-gray-100 hover:bg-gray-50/50 transition-colors duration-200">
                  <TableCell className="font-light">{p.date}</TableCell>
                  <TableCell className="font-light">${p.amount.toLocaleString()}</TableCell>
                  <TableCell>
                    {p.status === 'paid' ? (
                      <Badge className="bg-gray-100 text-gray-800 border-gray-200">Paid</Badge>
                    ) : (
                      <Badge className="bg-gray-100 text-gray-800 border-gray-200">Pending</Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-gray-600 hover:text-black hover:bg-gray-50 font-light"
                      onClick={() => handleViewReceipt(p)}
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="p-4 border-t border-gray-100 bg-gray-50/30">
            <Button 
              variant="ghost" 
              className="w-full text-gray-600 hover:text-black hover:bg-gray-50 font-light"
              onClick={handleViewAllPayments}
            >
              View All Payments
              <ArrowUpRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Make Payment Modal */}
      <Dialog open={showPaymentModal} onOpenChange={setShowPaymentModal}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5" />
              Make Payment
            </DialogTitle>
            <DialogDescription>
              Pay your outstanding rent balance securely.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="amount">Amount</Label>
              <Input
                id="amount"
                type="number"
                placeholder="Enter amount"
                value={paymentForm.amount}
                onChange={(e) => setPaymentForm({...paymentForm, amount: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="payment-method">Payment Method</Label>
              <Select value={paymentForm.paymentMethod} onValueChange={(value) => setPaymentForm({...paymentForm, paymentMethod: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Select payment method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="credit_card">
                    <div className="flex items-center gap-2">
                      <CreditCardIcon className="h-4 w-4" />
                      Credit Card
                    </div>
                  </SelectItem>
                  <SelectItem value="debit_card">
                    <div className="flex items-center gap-2">
                      <CreditCardIcon className="h-4 w-4" />
                      Debit Card
                    </div>
                  </SelectItem>
                  <SelectItem value="bank_transfer">
                    <div className="flex items-center gap-2">
                      <Banknote className="h-4 w-4" />
                      Bank Transfer
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="card-number">Card Number</Label>
              <Input
                id="card-number"
                placeholder="1234 5678 9012 3456"
                value={paymentForm.cardNumber}
                onChange={(e) => setPaymentForm({...paymentForm, cardNumber: e.target.value})}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="expiry">Expiry Date</Label>
                <Input
                  id="expiry"
                  placeholder="MM/YY"
                  value={paymentForm.expiryDate}
                  onChange={(e) => setPaymentForm({...paymentForm, expiryDate: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cvv">CVV</Label>
                <Input
                  id="cvv"
                  placeholder="123"
                  value={paymentForm.cvv}
                  onChange={(e) => setPaymentForm({...paymentForm, cvv: e.target.value})}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="name">Name on Card</Label>
              <Input
                id="name"
                placeholder="John Doe"
                value={paymentForm.nameOnCard}
                onChange={(e) => setPaymentForm({...paymentForm, nameOnCard: e.target.value})}
              />
            </div>
            <div className="bg-gray-50 p-3 rounded-lg">
              <p className="text-sm text-gray-600">
                <strong>Property:</strong> Downtown Residences, Unit 5B
              </p>
              <p className="text-sm text-gray-600">
                <strong>Outstanding Balance:</strong> {formatCurrency(pendingAmount)}
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowPaymentModal(false)}>
              Cancel
            </Button>
            <Button onClick={handlePaymentSubmit}>
              <CreditCard className="h-4 w-4 mr-2" />
              Process Payment
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Receipt Modal */}
      <Dialog open={showReceiptModal} onOpenChange={setShowReceiptModal}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Payment Receipt
            </DialogTitle>
            <DialogDescription>
              Official receipt for your rent payment.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            {selectedPayment && (
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium mb-3">Payment Details</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Payment ID:</span>
                      <span className="font-medium">{selectedPayment.id}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Date:</span>
                      <span className="font-medium">{selectedPayment.date}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Amount:</span>
                      <span className="font-medium">{formatCurrency(selectedPayment.amount)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Status:</span>
                      <Badge className={selectedPayment.status === 'paid' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}>
                        {selectedPayment.status === 'paid' ? 'Paid' : 'Pending'}
                      </Badge>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium mb-3">Property Information</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Property:</span>
                      <span className="font-medium">Downtown Residences, Unit 5B</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Tenant:</span>
                      <span className="font-medium">Your Name</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Landlord:</span>
                      <span className="font-medium">Property Management LLC</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowReceiptModal(false)}>
              Close
            </Button>
            <Button onClick={handleExportRecords}>
              <Download className="h-4 w-4 mr-2" />
              Download Receipt
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View All Receipts Modal */}
      <Dialog open={showAllReceiptsModal} onOpenChange={setShowAllReceiptsModal}>
        <DialogContent className="sm:max-w-[700px] max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Eye className="h-5 w-5" />
              All Payment Receipts
            </DialogTitle>
            <DialogDescription>
              View and download all your payment receipts.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-3">
              {samplePayments.map((payment) => (
                <div key={payment.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-gray-100">
                      <FileText className="h-4 w-4 text-gray-600" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">Payment Receipt - {payment.date}</p>
                      <p className="text-xs text-gray-500">ID: {payment.id}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">{formatCurrency(payment.amount)}</span>
                    <Badge className={payment.status === 'paid' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}>
                      {payment.status === 'paid' ? 'Paid' : 'Pending'}
                    </Badge>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => {
                        setSelectedPayment(payment);
                        setShowAllReceiptsModal(false);
                        setShowReceiptModal(true);
                      }}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAllReceiptsModal(false)}>
              Close
            </Button>
            <Button onClick={handleExportRecords}>
              <Download className="h-4 w-4 mr-2" />
              Export All Receipts
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View All Payments Modal */}
      <Dialog open={showAllPaymentsModal} onOpenChange={setShowAllPaymentsModal}>
        <DialogContent className="sm:max-w-[800px] max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Complete Payment History
            </DialogTitle>
            <DialogDescription>
              View your complete payment history and transaction details.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-gray-100">
                    <TableHead className="font-light text-gray-600">Date</TableHead>
                    <TableHead className="font-light text-gray-600">Amount</TableHead>
                    <TableHead className="font-light text-gray-600">Status</TableHead>
                    <TableHead className="font-light text-gray-600">Method</TableHead>
                    <TableHead className="text-right font-light text-gray-600">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {samplePayments.map((payment) => (
                    <TableRow key={payment.id} className="border-gray-100 hover:bg-gray-50/50 transition-colors duration-200">
                      <TableCell className="font-light">{payment.date}</TableCell>
                      <TableCell className="font-light">{formatCurrency(payment.amount)}</TableCell>
                      <TableCell>
                        <Badge className={payment.status === 'paid' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}>
                          {payment.status === 'paid' ? 'Paid' : 'Pending'}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-light">Credit Card</TableCell>
                      <TableCell className="text-right">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-gray-600 hover:text-black hover:bg-gray-50 font-light"
                          onClick={() => {
                            setSelectedPayment(payment);
                            setShowAllPaymentsModal(false);
                            setShowReceiptModal(true);
                          }}
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          View Receipt
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-medium mb-2">Payment Summary</h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">Total Paid:</span>
                  <span className="font-medium ml-2">{formatCurrency(totalPaid)}</span>
                </div>
                <div>
                  <span className="text-gray-600">Pending Amount:</span>
                  <span className="font-medium ml-2">{formatCurrency(pendingAmount)}</span>
                </div>
                <div>
                  <span className="text-gray-600">Total Transactions:</span>
                  <span className="font-medium ml-2">{samplePayments.length}</span>
                </div>
                <div>
                  <span className="text-gray-600">Payment Method:</span>
                  <span className="font-medium ml-2">Credit Card</span>
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAllPaymentsModal(false)}>
              Close
            </Button>
            <Button onClick={handleExportRecords}>
              <Download className="h-4 w-4 mr-2" />
              Export History
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PaymentHistory;


