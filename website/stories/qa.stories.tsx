import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { ScrollView, TouchableWithoutFeedback, View } from 'react-native';
import {
  Autocomplete, AutocompleteItem, Button, Calendar, Card, CheckBox, Datepicker, Icon, IconProps, IndexPath,
  Input, Layout, List, ListItem, Menu, MenuItem, Modal, OverflowMenu, Popover, Radio, RadioGroup,
  Select, SelectItem, Tab, TabBar, Text, Toggle, Tooltip, TopNavigation, TopNavigationAction,
} from '@ui-kitten/components';

/**
 * Instrumented page for the web QA runner (`website/qa/run.mjs`). Every callback pushes a line to
 * `window.__qa`, so a CDP script can assert presses, hover / focus states, first-open placement and
 * keyboard behaviour instead of reading screenshots. Hidden from the Storybook sidebar and docs build
 * (`tags`); the runner opens it at `iframe.html?id=qa-web--all&viewMode=story`.
 */
declare global {
  interface Window { __qa?: string[] }
}

const log = (entry: string): void => {
  (window.__qa = window.__qa || []).push(entry);
};

const StarIcon = (props: IconProps): React.ReactElement => <Icon {...props} name='star' />;
const MenuIcon = (props: IconProps): React.ReactElement => <Icon {...props} name='more-vertical' />;
const CalendarIcon = (props: IconProps): React.ReactElement => <Icon {...props} name='calendar' />;

const FRUITS = ['Apple', 'Banana', 'Cherry', 'Date', 'Elderberry'];
// Distinct from FRUITS so the Autocomplete filter assertions cannot match List rows.
const LIST_ROWS = ['Alpha', 'Beta', 'Gamma'];

const QaPage = (): React.ReactElement => {
  const [checked, setChecked] = useState(false);
  const [toggled, setToggled] = useState(false);
  const [radio, setRadio] = useState(false);
  const [group, setGroup] = useState(0);
  const [text, setText] = useState('');
  const [secure, setSecure] = useState(true);
  const [pw, setPw] = useState('');
  const [sel, setSel] = useState<IndexPath | undefined>(undefined);
  const [popover, setPopover] = useState(false);
  const [tooltip, setTooltip] = useState(false);
  const [ofm, setOfm] = useState(false);
  const [modal, setModal] = useState(false);
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [calDate, setCalDate] = useState(new Date(2026, 8, 10));
  const [menu, setMenu] = useState<IndexPath>(new IndexPath(0));
  const [tab, setTab] = useState(0);
  const [ac, setAc] = useState('');
  const acData = FRUITS.filter((f) => f.toLowerCase().includes(ac.toLowerCase()));

  return (
    <ScrollView testID='qa-scroll'>
      <Layout style={{ padding: 24, gap: 12 }}>
        <View style={{ flexDirection: 'row', gap: 8 }}>
          <Button
            testID='qa-button'
            onPress={() => log('button:press')}
            onPressIn={() => log('button:in')}
            onPressOut={() => log('button:out')}
            onLongPress={() => log('button:long')}
          >
            PRESS ME
          </Button>
          <Button testID='qa-button-disabled' disabled onPress={() => log('disabled:press')}>DISABLED</Button>
          <Button testID='qa-button-icon' accessoryLeft={StarIcon} onPress={() => log('icon:press')} />
          <Button testID='qa-button-ghost' appearance='ghost' onPress={() => log('ghost:press')}>GHOST</Button>
        </View>

        <CheckBox testID='qa-checkbox' checked={checked} onChange={(v) => { setChecked(v); log(`checkbox:${v}`); }}>
          {`Checkbox ${checked ? 'on' : 'off'}`}
        </CheckBox>
        <Toggle testID='qa-toggle' checked={toggled} onChange={(v) => { setToggled(v); log(`toggle:${v}`); }}>
          {`Toggle ${toggled ? 'on' : 'off'}`}
        </Toggle>
        <Radio testID='qa-radio' checked={radio} onChange={(v) => { setRadio(v); log(`radio:${v}`); }}>
          {`Radio ${radio ? 'on' : 'off'}`}
        </Radio>
        <RadioGroup testID='qa-radiogroup' selectedIndex={group} onChange={(i) => { setGroup(i); log(`group:${i}`); }}>
          <Radio testID='qa-rg-0'>Group A</Radio>
          <Radio testID='qa-rg-1'>Group B</Radio>
        </RadioGroup>

        <Input
          testID='qa-input'
          label='Label'
          caption='Caption'
          placeholder='Type here'
          value={text}
          onChangeText={(t) => { setText(t); log(`input:${t}`); }}
          onFocus={() => log('input:focus')}
          onBlur={() => log('input:blur')}
          accessoryRight={StarIcon}
        />
        <Text testID='qa-input-echo'>{`echo:${text}`}</Text>
        <Input
          testID='qa-password'
          placeholder='Password'
          value={pw}
          secureTextEntry={secure}
          onChangeText={setPw}
          accessoryRight={(props) => (
            <TouchableWithoutFeedback testID='qa-password-eye' onPress={() => { setSecure((v) => !v); log('eye:press'); }}>
              <Icon {...props} name={secure ? 'eye-off' : 'eye'} />
            </TouchableWithoutFeedback>
          )}
        />
        <Text testID='qa-password-echo'>{`secure:${secure}`}</Text>

        <Select
          testID='qa-select'
          label='Select'
          placeholder='Pick'
          selectedIndex={sel}
          value={sel ? `Option ${sel.row + 1}` : undefined}
          onSelect={(i) => { setSel(i as IndexPath); log(`select:${(i as IndexPath).row}`); }}
        >
          <SelectItem title='Option 1' />
          <SelectItem title='Option 2' />
          <SelectItem title='Option 3' />
        </Select>

        <View style={{ flexDirection: 'row', gap: 8 }}>
          <Popover
            visible={popover}
            anchor={() => <Button testID='qa-popover-btn' onPress={() => setPopover(true)}>POPOVER</Button>}
            onBackdropPress={() => { setPopover(false); log('popover:backdrop'); }}
          >
            <Layout style={{ padding: 12 }}><Text testID='qa-popover-content'>Popover content</Text></Layout>
          </Popover>
          <Tooltip
            visible={tooltip}
            anchor={() => <Button testID='qa-tooltip-btn' onPress={() => setTooltip(true)}>TOOLTIP</Button>}
            onBackdropPress={() => setTooltip(false)}
          >
            Tooltip text
          </Tooltip>
          <OverflowMenu
            visible={ofm}
            anchor={() => <Button testID='qa-ofm-btn' accessoryLeft={MenuIcon} onPress={() => setOfm(true)} />}
            onBackdropPress={() => setOfm(false)}
            onSelect={(i) => { setOfm(false); log(`ofm:${i.row}`); }}
          >
            <MenuItem title='OFM One' />
            <MenuItem title='OFM Two' />
          </OverflowMenu>
          <Button testID='qa-modal-btn' onPress={() => setModal(true)}>MODAL</Button>
          <Modal
            visible={modal}
            backdropStyle={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
            onBackdropPress={() => { setModal(false); log('modal:backdrop'); }}
          >
            <Card disabled>
              <Text testID='qa-modal-content'>Modal content</Text>
              <Button testID='qa-modal-close' onPress={() => setModal(false)}>CLOSE</Button>
            </Card>
          </Modal>
        </View>

        <Datepicker
          testID='qa-datepicker'
          label='Date'
          caption='Pick a date'
          placeholder='Pick date'
          date={date}
          onSelect={(d) => { setDate(d); log(`date:${d.getDate()}`); }}
          accessoryRight={CalendarIcon}
        />
        <Text testID='qa-date-echo'>{`date:${date ? date.getDate() : 'none'}`}</Text>
        <Calendar testID='qa-calendar' date={calDate} onSelect={(d) => { setCalDate(d); log(`cal:${d.getDate()}`); }} />
        <Text testID='qa-cal-echo'>{`cal:${calDate.getDate()}`}</Text>

        <Card
          testID='qa-card'
          onPress={() => log('card:press')}
          header={(props) => <View {...props}><Text>Header</Text></View>}
        >
          <Text>Card body</Text>
        </Card>

        <List
          testID='qa-list'
          data={LIST_ROWS}
          renderItem={({ item }) => (
            <ListItem
              testID={`qa-li-${item}`}
              title={item}
              description={`${item} desc`}
              accessoryLeft={StarIcon}
              accessoryRight={() => (
                <Button testID={`qa-li-btn-${item}`} size='tiny' onPress={() => log(`li-btn:${item}`)}>GO</Button>
              )}
              onPress={() => log(`li:${item}`)}
            />
          )}
        />
        <Menu testID='qa-menu' selectedIndex={menu} onSelect={(i) => { setMenu(i); log(`menu:${i.row}`); }}>
          <MenuItem testID='qa-mi-0' title='Menu A' accessoryLeft={StarIcon} />
          <MenuItem testID='qa-mi-1' title='Menu B' />
        </Menu>
        <TabBar testID='qa-tabbar' selectedIndex={tab} onSelect={(i) => { setTab(i); log(`tab:${i}`); }}>
          <Tab testID='qa-tab-0' title='Tab A' />
          <Tab testID='qa-tab-1' title='Tab B' />
        </TabBar>
        <Text testID='qa-tab-echo'>{`tab:${tab}`}</Text>

        <TopNavigation title='Title' subtitle='Subtitle' accessoryLeft={StarIcon} />
        {/* Standalone, like the native showcase: inside an accessory slot RNW gives it a zero-width box. */}
        <TopNavigationAction testID='qa-topnav-action' icon={StarIcon} onPress={() => log('topnav:press')} />

        <Autocomplete
          testID='qa-autocomplete'
          placeholder='Fruit'
          value={ac}
          onChangeText={(t) => { setAc(t); log(`ac:${t}`); }}
          onSelect={(i) => { setAc(acData[i]); log(`ac-select:${acData[i]}`); }}
        >
          {acData.map((f) => <AutocompleteItem key={f} title={f} />)}
        </Autocomplete>
        <View style={{ height: 300 }} />
      </Layout>
    </ScrollView>
  );
};

const meta: Meta = {
  title: 'QA/Web',
  parameters: { layout: 'fullscreen' },
  // Keep it out of the sidebar and the docs build; the runner loads it by id.
  tags: ['!dev', '!autodocs'],
};

export default meta;

export const All: StoryObj = { render: () => <QaPage /> };
