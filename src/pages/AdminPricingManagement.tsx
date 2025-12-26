import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Plus, Edit, Trash2, Check, X } from 'lucide-react';

interface PricingPlan {
  id: string;
  name: string;
  monthly_price: number;
  annual_price: number;
  period: string;
  description: string;
  features: string[];
  popular: boolean;
  is_active: boolean;
  display_order: number;
  created_at: string;
  updated_at: string;
}

const AdminPricingManagement = () => {
  const { toast } = useToast();
  const { user, profile } = useAuth();
  const [plans, setPlans] = useState<PricingPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingPlan, setEditingPlan] = useState<PricingPlan | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    monthly_price: '',
    annual_price: '',
    period: 'per month',
    description: '',
    features: '',
    popular: false,
    is_active: true,
    display_order: 0
  });

  useEffect(() => {
    if (user && profile) {
      loadPricingPlans();
    } else if (!user) {
      setLoading(false);
      toast({
        title: "Authentication Required",
        description: "Please sign in to view pricing plans.",
        variant: "destructive",
      });
    }
  }, [user, profile]);

  const loadPricingPlans = async () => {
    try {
      setLoading(true);
      console.log('🔄 Loading pricing plans...');
      console.log('👤 Current user:', user?.email);
      console.log('👤 Current profile:', profile?.role);
      
      // Add timeout to prevent infinite loading
      const timeoutId = setTimeout(() => {
        console.warn('⏱️ Pricing plans query timeout after 8 seconds');
        setLoading(false);
        setPlans([]);
        toast({
          title: "Timeout",
          description: "Request took too long. Please check your connection or try again.",
          variant: "destructive",
        });
      }, 8000);
      
      // Check if user is admin
      const isAdmin = profile?.role === 'admin';
      console.log('🔐 Is admin:', isAdmin);
      
      // Try different query strategies based on admin status
      let { data, error } = await (supabase as any)
        .from('pricing_plans')
        .select('*')
        .order('display_order', { ascending: true });

      // If admin query fails, try with explicit filter
      if (error && isAdmin) {
        console.warn('⚠️ Admin query failed, trying alternative approach...');
        // Try getting all plans without filter (admin should see all)
        const result = await (supabase as any)
          .from('pricing_plans')
          .select('*')
          .order('display_order', { ascending: true });
        data = result.data;
        error = result.error;
      }

      // If still failing and user is admin, try active plans only as fallback
      if (error && (error.code === 'PGRST301' || error.message?.includes('permission') || error.message?.includes('policy'))) {
        console.warn('⚠️ Permission denied, trying active plans only...');
        const result = await (supabase as any)
          .from('pricing_plans')
          .select('*')
          .eq('is_active', true)
          .order('display_order', { ascending: true });
        data = result.data;
        error = result.error;
      }

      clearTimeout(timeoutId);

      console.log('📊 Query result:', { 
        data, 
        error, 
        dataLength: data?.length,
        errorCode: error?.code,
        errorMessage: error?.message 
      });

      if (error) {
        console.error('❌ Supabase error:', error);
        console.error('Error code:', error.code);
        console.error('Error message:', error.message);
        console.error('Error details:', JSON.stringify(error, null, 2));
        
        // If it's a permission error and user is admin, show helpful message
        if ((error.code === 'PGRST301' || error.message?.includes('permission')) && isAdmin) {
          toast({
            title: "Permission Error",
            description: "Admin access denied. Please check your database RLS policies or contact support.",
            variant: "destructive",
          });
        } else {
          throw error;
        }
      }
      
      const plansData = (data || []) as PricingPlan[];
      console.log(`✅ Loaded ${plansData.length} pricing plan(s)`);
      
      // Transform features from JSONB to array if needed
      const transformedPlans = plansData.map(plan => ({
        ...plan,
        features: Array.isArray(plan.features) ? plan.features : (typeof plan.features === 'string' ? JSON.parse(plan.features) : [])
      }));
      
      setPlans(transformedPlans);
      
      if (transformedPlans.length === 0) {
        console.warn('⚠️ No pricing plans found in database');
        toast({
          title: "No Plans Found",
          description: "No pricing plans found. You can create one using the 'Add Pricing Plan' button.",
          variant: "default",
        });
      }
    } catch (error: any) {
      console.error('❌ Error loading pricing plans:', error);
      console.error('Error code:', error?.code);
      console.error('Error message:', error?.message);
      console.error('Error stack:', error?.stack);
      toast({
        title: "Error",
        description: error?.message || error?.details?.message || "Failed to load pricing plans. Please check your connection.",
        variant: "destructive",
      });
      // Set empty array on error to prevent infinite loading
      setPlans([]);
    } finally {
      setLoading(false);
      console.log('✅ Loading complete');
    }
  };

  const handleOpenDialog = (plan?: PricingPlan) => {
    if (plan) {
      setEditingPlan(plan);
      setFormData({
        name: plan.name,
        monthly_price: plan.monthly_price.toString(),
        annual_price: plan.annual_price.toString(),
        period: plan.period,
        description: plan.description || '',
        features: plan.features.join('\n'),
        popular: plan.popular,
        is_active: plan.is_active,
        display_order: plan.display_order
      });
    } else {
      setEditingPlan(null);
      setFormData({
        name: '',
        monthly_price: '',
        annual_price: '',
        period: 'per month',
        description: '',
        features: '',
        popular: false,
        is_active: true,
        display_order: plans.length
      });
    }
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setEditingPlan(null);
    setFormData({
      name: '',
      monthly_price: '',
      annual_price: '',
      period: 'per month',
      description: '',
      features: '',
      popular: false,
      is_active: true,
      display_order: 0
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const featuresArray = formData.features
        .split('\n')
        .map(f => f.trim())
        .filter(f => f.length > 0);

      if (featuresArray.length === 0) {
        toast({
          title: "Error",
          description: "Please add at least one feature",
          variant: "destructive",
        });
        return;
      }

      const planData = {
        name: formData.name,
        monthly_price: parseFloat(formData.monthly_price),
        annual_price: parseFloat(formData.annual_price),
        period: formData.period,
        description: formData.description,
        features: featuresArray,
        popular: formData.popular,
        is_active: formData.is_active,
        display_order: parseInt(formData.display_order.toString())
      };

      if (editingPlan) {
        // Update existing plan
        const { error } = await (supabase as any)
          .from('pricing_plans')
          .update(planData)
          .eq('id', editingPlan.id);

        if (error) throw error;

        toast({
          title: "Success",
          description: "Pricing plan updated successfully",
        });
      } else {
        // Create new plan
        const { error } = await (supabase as any)
          .from('pricing_plans')
          .insert([planData]);

        if (error) throw error;

        toast({
          title: "Success",
          description: "Pricing plan created successfully",
        });
      }

      handleCloseDialog();
      loadPricingPlans();
    } catch (error: any) {
      console.error('Error saving pricing plan:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to save pricing plan",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this pricing plan?')) {
      return;
    }

    try {
      const { error } = await (supabase as any)
        .from('pricing_plans')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Pricing plan deleted successfully",
      });

      loadPricingPlans();
    } catch (error: any) {
      console.error('Error deleting pricing plan:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to delete pricing plan",
        variant: "destructive",
      });
    }
  };

  const handleToggleActive = async (plan: PricingPlan) => {
    try {
      const { error } = await (supabase as any)
        .from('pricing_plans')
        .update({ is_active: !plan.is_active })
        .eq('id', plan.id);

      if (error) throw error;

      toast({
        title: "Success",
        description: `Pricing plan ${!plan.is_active ? 'activated' : 'deactivated'}`,
      });

      loadPricingPlans();
    } catch (error: any) {
      console.error('Error toggling plan status:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to update pricing plan",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-slate-600">Loading pricing plans...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Pricing Management</h1>
          <p className="text-slate-600 mt-2">Manage pricing plans and subscription tiers</p>
        </div>
        <Button onClick={() => handleOpenDialog()} className="bg-blue-600 hover:bg-blue-700">
          <Plus className="h-4 w-4 mr-2" />
          Add Pricing Plan
        </Button>
      </div>

      {/* Pricing Plans Grid */}
      {plans.length === 0 ? (
        <Card className="p-12 text-center">
          <CardContent>
            <div className="flex flex-col items-center justify-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <Plus className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">No Pricing Plans</h3>
              <p className="text-slate-600 mb-6 max-w-md">
                You haven't created any pricing plans yet. Click the button below to create your first plan.
              </p>
              <Button onClick={() => handleOpenDialog()} className="bg-blue-600 hover:bg-blue-700">
                <Plus className="h-4 w-4 mr-2" />
                Create Your First Pricing Plan
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {plans.map((plan) => (
          <Card key={plan.id} className={plan.popular ? 'border-2 border-blue-500' : ''}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl">{plan.name}</CardTitle>
                {plan.popular && (
                  <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded">Popular</span>
                )}
              </div>
              <div className="mt-2">
                <span className="text-3xl font-bold">${plan.monthly_price}</span>
                <span className="text-gray-500">/{plan.period}</span>
              </div>
              <p className="text-sm text-gray-600 mt-2">{plan.description}</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 mb-4">
                <Label className="text-sm font-semibold">Features:</Label>
                <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                  {plan.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </div>
              
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <Switch
                    checked={plan.is_active}
                    onCheckedChange={() => handleToggleActive(plan)}
                  />
                  <Label className={plan.is_active ? 'text-green-600' : 'text-gray-400'}>
                    {plan.is_active ? 'Active' : 'Inactive'}
                  </Label>
                </div>
              </div>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleOpenDialog(plan)}
                  className="flex-1"
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Edit
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDelete(plan.id)}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
        </div>
      )}

      {/* Add/Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingPlan ? 'Edit Pricing Plan' : 'Add New Pricing Plan'}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Plan Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="display_order">Display Order</Label>
                <Input
                  id="display_order"
                  type="number"
                  value={formData.display_order}
                  onChange={(e) => setFormData({ ...formData, display_order: parseInt(e.target.value) || 0 })}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="monthly_price">Monthly Price ($) *</Label>
                <Input
                  id="monthly_price"
                  type="number"
                  step="0.01"
                  value={formData.monthly_price}
                  onChange={(e) => setFormData({ ...formData, monthly_price: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="annual_price">Annual Price ($) *</Label>
                <Input
                  id="annual_price"
                  type="number"
                  step="0.01"
                  value={formData.annual_price}
                  onChange={(e) => setFormData({ ...formData, annual_price: e.target.value })}
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="period">Period</Label>
              <Input
                id="period"
                value={formData.period}
                onChange={(e) => setFormData({ ...formData, period: e.target.value })}
                placeholder="e.g., per month"
              />
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={2}
              />
            </div>

            <div>
              <Label htmlFor="features">Features (one per line) *</Label>
              <Textarea
                id="features"
                value={formData.features}
                onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                rows={6}
                placeholder="Up to 5 properties&#10;Basic tenant management&#10;Online rent collection"
                required
              />
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Switch
                  id="popular"
                  checked={formData.popular}
                  onCheckedChange={(checked) => setFormData({ ...formData, popular: checked })}
                />
                <Label htmlFor="popular">Mark as Popular</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="is_active"
                  checked={formData.is_active}
                  onCheckedChange={(checked) => setFormData({ ...formData, is_active: checked })}
                />
                <Label htmlFor="is_active">Active</Label>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-4">
              <Button type="button" variant="outline" onClick={handleCloseDialog}>
                Cancel
              </Button>
              <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                {editingPlan ? 'Update Plan' : 'Create Plan'}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminPricingManagement;

