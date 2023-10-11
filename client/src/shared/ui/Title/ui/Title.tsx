import { memo } from 'react';

interface TitleProps{
children: string
}

export const Title = memo(({ children }: TitleProps) => <h1 className="text-center mb-3">{children}</h1>);
