import React from 'react';
import { ImageRequireSource } from 'react-native';
import {
  AppLoading,
  SplashScreen,
} from 'expo';
import { Asset } from 'expo-asset';
import * as Font from 'expo-font';
import { LoadingAnimation } from './loadingAnimation.component';

export interface Assets {
  images?: ImageRequireSource[];
  fonts?: { [key: string]: number };
}

interface Props {
  assets: Assets;
  splash: ImageRequireSource;
  children: React.ReactNode;
}

interface State {
  loaded: boolean;
}

type LoadingElement = React.ReactElement<{}>;

/**
 * Loads child component after asynchronous tasks are done
 */
export class ApplicationLoader extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);
    SplashScreen.preventAutoHide();
  }

  public state: State = {
    loaded: false,
  };

  private onLoadSuccess = () => {
    // setTimeout(() => {
      this.setState({ loaded: true });
      SplashScreen.hide();
    // }, 1);
  };

  private onLoadError = (error: Error) => {
    console.warn(error);
  };

  private loadResources = (): Promise<void> => {
    return this.loadResourcesAsync(this.props.assets);
  };

  private loadFonts = (fonts: {[key: string]: number}): Promise<void> => {
    return Font.loadAsync(fonts);
  };

  private loadImages = (images: ImageRequireSource[]): Promise<void[]> => {
    const tasks: Promise<void>[] = images.map((image: ImageRequireSource): Promise<void> => {
      return Asset.fromModule(image).downloadAsync();
    });

    return Promise.all(tasks);
  };

  private async loadResourcesAsync(assets: Assets): Promise<void> {
    const { fonts, images } = assets;

    // @ts-ignore (expo type error)
    return Promise.all([
      fonts && this.loadFonts(fonts),
      images && this.loadImages(images),
    ]);
  }

  private renderLoading = (): LoadingElement => {
    return (
      <AppLoading
        startAsync={this.loadResources}
        onFinish={this.onLoadSuccess}
        onError={this.onLoadError}
        autoHideSplash={false}
      />
    );
  };

  public render(): React.ReactNode {
    return (
      <React.Fragment>
        {this.state.loaded ? this.props.children : this.renderLoading()}
        <LoadingAnimation
          isLoaded={this.state.loaded}
          image={this.props.splash}
        />
      </React.Fragment>
    );
  }
}
