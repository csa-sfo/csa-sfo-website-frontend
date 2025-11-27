import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Linkedin, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface LinkedInConnectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConnect: (clientId: string, clientSecret: string) => void;
}

export function LinkedInConnectModal({ isOpen, onClose, onConnect }: LinkedInConnectModalProps) {
  const [clientId, setClientId] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [isConnecting, setIsConnecting] = useState(false);

  const handleConnect = async () => {
    if (!clientId.trim() || !clientSecret.trim()) {
      toast.error("Please enter both Client ID and Client Secret");
      return;
    }

    setIsConnecting(true);
    
    // Simulate API call to store credentials and initiate OAuth
    setTimeout(() => {
      onConnect(clientId, clientSecret);
      setIsConnecting(false);
      // Reset form
      setClientId("");
      setClientSecret("");
      onClose();
      toast.success("LinkedIn connected successfully!");
    }, 1500);
  };

  const handleCancel = () => {
    setClientId("");
    setClientSecret("");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <div className="p-2 bg-[#0077B5] rounded-lg">
              <Linkedin className="h-5 w-5 text-white" />
            </div>
            Connect LinkedIn
          </DialogTitle>
          <DialogDescription>
            Enter your LinkedIn OAuth credentials to connect your account
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          {/* Client ID Input */}
          <div className="space-y-2">
            <Label htmlFor="linkedin-client-id" className="text-sm font-medium">
              Client ID
            </Label>
            <Input
              id="linkedin-client-id"
              type="text"
              placeholder="Enter your LinkedIn Client ID"
              value={clientId}
              onChange={(e) => setClientId(e.target.value)}
              className="w-full"
              disabled={isConnecting}
            />
            <p className="text-xs text-gray-500">
              Get this from your LinkedIn App settings
            </p>
          </div>

          {/* Client Secret Input */}
          <div className="space-y-2">
            <Label htmlFor="linkedin-client-secret" className="text-sm font-medium">
              Client Secret
            </Label>
            <Input
              id="linkedin-client-secret"
              type="password"
              placeholder="Enter your LinkedIn Client Secret"
              value={clientSecret}
              onChange={(e) => setClientSecret(e.target.value)}
              className="w-full"
              disabled={isConnecting}
            />
            <p className="text-xs text-gray-500">
              Keep this secret secure and never share it publicly
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 justify-end">
          <Button
            variant="outline"
            onClick={handleCancel}
            disabled={isConnecting}
          >
            Cancel
          </Button>
          <Button
            onClick={handleConnect}
            disabled={isConnecting || !clientId.trim() || !clientSecret.trim()}
            className="bg-[#0077B5] hover:bg-[#006399] text-white"
          >
            {isConnecting ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Connecting...
              </>
            ) : (
              <>
                <Linkedin className="h-4 w-4 mr-2" />
                Connect
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

