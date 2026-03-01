import React from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';

interface StorybookEmbedProps {
  storyId: string;
  height?: number;
}

export default function StorybookEmbed({ storyId, height = 400 }: StorybookEmbedProps): React.ReactElement {
  return (
    <BrowserOnly>
      {() => (
        <div className="storybook-embed">
          <iframe
            src={`/react-native-ui-kitten/storybook/iframe.html?id=${storyId}&viewMode=story`}
            height={height}
            title={`Storybook: ${storyId}`}
          />
        </div>
      )}
    </BrowserOnly>
  );
}
