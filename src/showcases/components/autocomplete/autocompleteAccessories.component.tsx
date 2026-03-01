import React, { useCallback } from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import {Autocomplete, AutocompleteItem, Icon, IconElement, TextElement, TextProps} from '@ui-kitten/components';
// @ts-ignore
import {RenderProp} from "@ui-kitten/components/devsupport";

const movies = [
  {title: 'Star Wars'},
  {title: 'Back to the Future'},
  {title: 'The Matrix'},
  {title: 'Inception'},
  {title: 'Interstellar'},
];

const filter = (item: {
  title: any;
}, query: string): boolean => item.title.toLowerCase().includes(query.toLowerCase());

const StarIcon = (props: any): IconElement => (
  <Icon
    {...props}
    name='star'
  />
);

export const AutocompleteAccessoriesShowcase = (): React.ReactElement => {

  const [value, setValue] = React.useState("");
  const [data, setData] = React.useState(movies) as any;

  const onSelect = useCallback((index: string | number): void => {
    setValue(data[index].title);
  }, [data]);

  const onChangeText = useCallback((query: any) => {
    setValue(query);
    setData(movies.filter(item => filter(item, query)));
  }, []);

  const clearInput = (): void => {
    setValue("");
    setData(movies);
  };

  const renderOption = (item: { title: RenderProp<TextProps> | TextElement | undefined; }, index: React.Key | null | undefined): React.ReactElement => (
    <AutocompleteItem
      key={index}
      title={item.title}
      accessoryLeft={StarIcon}
    />
  );

  const renderCloseIcon = (props: any): React.ReactElement => (
    <TouchableWithoutFeedback onPress={clearInput}>
      <Icon
        {...props}
        name='close'
      />
    </TouchableWithoutFeedback>
  );

  return (
    <Autocomplete
      placeholder='Place your Text'
      value={value}
      placement='inner top'
      accessoryRight={renderCloseIcon}
      onChangeText={onChangeText}
      onSelect={onSelect}
    >
      {data.map(renderOption)}
    </Autocomplete>
  );
};

