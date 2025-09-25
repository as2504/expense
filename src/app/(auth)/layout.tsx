import { Logo } from "@/components/logo";
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
    const loginImage = PlaceHolderImages.find(p => p.id === 'login-hero');
    
    return (
        <div className="w-full lg:grid lg:min-h-[100vh] lg:grid-cols-2 xl:min-h-[100vh]">
            <div className="flex items-center justify-center py-12">
                <div className="mx-auto grid w-[350px] gap-6">
                    <div className="grid gap-2 text-center">
                        <div className="flex justify-center items-center gap-2 mb-4">
                            <Logo />
                        </div>
                        <h1 className="text-3xl font-bold font-headline">Welcome</h1>
                        <p className="text-balance text-muted-foreground">
                            Enter your credentials to access your account
                        </p>
                    </div>
                    {children}
                </div>
            </div>
            <div className="hidden bg-muted lg:block relative">
                {loginImage && (
                    <Image
                        src={loginImage.imageUrl}
                        alt={loginImage.description}
                        fill
                        className="object-cover"
                        data-ai-hint={loginImage.imageHint}
                    />
                )}
            </div>
        </div>
    );
}
