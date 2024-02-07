export interface Input {
  readonly normalizedValue: unknown
  readonly empty?: boolean
  readonly pristine?: boolean
}

export interface Option<T = unknown> {
  value: T
  label: string
}

export enum InputTextType {
  TEXT = 'text',
  PASSWORD = 'password',
}

export const TRichSelectClasses = {
  wrapper: '',
  buttonWrapper: '',
  selectButton: '',
  selectButtonLabel: '',
  selectButtonTagWrapper: '-mx-2 -my-2.5 py-1 pr-8',
  selectButtonTag:
    'bg-blue-500 block disabled:cursor-not-allowed disabled:opacity-50 duration-100 ease-in-out focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded shadow-sm text-sm text-white transition white-space-no m-0.5 max-w-full overflow-hidden h-8 flex items-center',
  selectButtonTagText: 'px-3',
  selectButtonTagDeleteButton:
    '-ml-1.5 h-full hover:bg-blue-600 hover:shadow-sm inline-flex items-center px-2 transition',
  selectButtonTagDeleteButtonIcon: '',
  selectButtonPlaceholder: 'text-gray-400',
  selectButtonIcon: 'text-gray-600',
  selectButtonClearButton: 'hover:bg-blue-100 text-gray-600 rounded transition duration-100 ease-in-out',
  selectButtonClearIcon: '',
  dropdown: '-mt-1 bg-white border-b border-gray-300 border-l border-r rounded-b shadow-sm',
  dropdownFeedback: 'pb-2 px-3 text-gray-400 text-sm',
  loadingMoreResults: 'pb-2 px-3 text-gray-400 text-sm',
  optionsList: '',
  searchWrapper: 'p-2 placeholder-gray-400',
  searchBox: 'px-3 py-2 bg-gray-50 text-sm rounded border focus:outline-none focus:shadow-outline border-gray-300',
  optgroup: 'text-gray-400 uppercase text-xs py-1 px-2 font-semibold',
  option: '',
  disabledOption: '',
  highlightedOption: 'bg-gray-50',
  selectedOption: 'bg-gray-100 bg-blue-500  text-black',
  selectedHighlightedOption: 'bg-gray-100 bg-blue-600 text-black',
  optionContent: 'flex justify-between items-center px-3 py-2',
  optionLabel: '',
  selectedIcon: '',
  enterClass: 'opacity-0',
  enterActiveClass: 'transition ease-out duration-100',
  enterToClass: 'opacity-100',
  leaveClass: 'opacity-100',
  leaveActiveClass: 'transition ease-in duration-75',
  leaveToClass: 'opacity-0',
} as const
