import {
  FontBoldIcon,
  FontItalicIcon,
  UnderlineIcon,
} from '@radix-ui/react-icons';
import React, { useState } from 'react';

import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Toggle } from '@/components/ui/toggle';

type Font = {
  bold: boolean;
  decoration: 'none' | 'underline';
  family: string;
  italic: boolean;
  size: string;
  style: 'normal' | 'italic';
  underline: boolean;
  weight: 'normal' | 'bold';
};

export const FontApp: React.FC = () => {
  const [font, setFont] = useState<Font>({
    bold: false,
    decoration: 'none',
    family: 'serif',
    italic: false,
    size: '16',
    style: 'normal',
    underline: false,
    weight: 'normal',
  });
  console.log('font.size', font.size);

  return (
    <div className="flex flex-row gap-8 items-center">
      <FontPicker font={font} onFontChange={setFont} />
      <Preview font={font} />
    </div>
  );
};

const Preview: React.FC<{ font: Font }> = ({ font }) => {
  return (
    <Card className="w-[100%]">
      <CardHeader>Demo paragraph</CardHeader>
      <CardContent>
        <p
          style={{
            fontFamily: font.family,
            fontSize: Number(font.size),
            fontStyle: font.style,
            fontWeight: font.bold ? 'bold' : 'normal',
            textDecoration: font.decoration,
          }}
        >
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </p>
      </CardContent>
    </Card>
  );
};
const FontPicker: React.FC<{
  font: Font;
  onFontChange: (font: Font) => void;
}> = ({ font, onFontChange }) => {
  return (
    <Card className="w-[320px]">
      <CardHeader>Font</CardHeader>
      <CardContent className="flex flex-col gap-4 items-end">
        <Label className="flex gap-2 items-center">
          Family
          <Select
            value={font.family}
            onValueChange={(family) => onFontChange({ ...font, family })}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Font" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="serif">serif</SelectItem>
              <SelectItem value="sans-serif">sans-serif</SelectItem>
            </SelectContent>
          </Select>
        </Label>

        <Label className="flex gap-2 items-center">
          Size
          <Input
            className="w-[90px]"
            type="number"
            value={font.size}
            onChange={(e) => onFontChange({ ...font, size: e.target.value })}
          />
        </Label>

        <div className="flex justify-start gap-2">
          <Toggle
            aria-label="Toggle bold"
            onPressedChange={(bold) => onFontChange({ ...font, bold })}
          >
            <FontBoldIcon className="h-4 w-4" />
          </Toggle>
          <Toggle
            aria-label="Toggle italic"
            onPressedChange={(italic) => onFontChange({ ...font, italic })}
          >
            <FontItalicIcon className="h-4 w-4" />
          </Toggle>
          <Toggle
            aria-label="Toggle underline"
            onPressedChange={(underline) =>
              onFontChange({ ...font, underline })
            }
          >
            <UnderlineIcon className="h-4 w-4" />
          </Toggle>
        </div>
      </CardContent>
    </Card>
  );
};
