import React, { useEffect, useRef } from 'react';

interface Tab {
  id: string;
  label: string;
}

interface TabSwitchProps {
  tabs: Tab[];
  activeId: string;
  onChange: (id: string) => void;
}

const TabSwitch: React.FC<TabSwitchProps> = ({ tabs, activeId, onChange }) => {
  const tablistRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const currentIndex = tabs.findIndex(tab => tab.id === activeId);

      switch (e.key) {
        case 'ArrowLeft':
          e.preventDefault();
          const prevIndex = currentIndex > 0 ? currentIndex - 1 : tabs.length - 1;
          onChange(tabs[prevIndex].id);
          break;
        case 'ArrowRight':
          e.preventDefault();
          const nextIndex = currentIndex < tabs.length - 1 ? currentIndex + 1 : 0;
          onChange(tabs[nextIndex].id);
          break;
        case 'Home':
          e.preventDefault();
          onChange(tabs[0].id);
          break;
        case 'End':
          e.preventDefault();
          onChange(tabs[tabs.length - 1].id);
          break;
      }
    };

    const tablist = tablistRef.current;
    if (tablist) {
      tablist.addEventListener('keydown', handleKeyDown);
      return () => tablist.removeEventListener('keydown', handleKeyDown);
    }
  }, [activeId, tabs, onChange]);

  return (
    <div
      ref={tablistRef}
      role="tablist"
      className="inline-flex rounded-full border border-line bg-button-bg p-1"
    >
      {tabs.map((tab) => {
        const isActive = tab.id === activeId;
        return (
          <button
            key={tab.id}
            id={`tab-${tab.id}`}
            role="tab"
            aria-selected={isActive}
            aria-controls={`panel-${tab.id}`}
            className={`px-6 py-3 rounded-full transition-colors duration-300 text-sm font-medium ${
              isActive
                ? 'bg-button-bg-hover text-text-active shadow-sm'
                : 'text-text-active/70 hover:text-text-active hover:bg-button-bg/50'
            }`}
            onClick={() => onChange(tab.id)}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
};

export default TabSwitch;
