import { Tooltip } from '../tooltip';

describe('Tooltip', () => {
  let tooltip;

  beforeEach(() => {
    document.body.innerHTML = '<div id="test-element"></div>';
    tooltip = new Tooltip();
  });

  test('should create and show a tooltip', () => {
    const testElement = document.getElementById('test-element');
    const messageId = tooltip.showTooltip('Test message', testElement);

    const createdTooltip = document.querySelector('.form-error');
    expect(createdTooltip).not.toBeNull();
    expect(createdTooltip.textContent).toContain('Test message');

    expect(messageId).toBeDefined();
  });

  test('should remove a tooltip', () => {
    const testElement = document.getElementById('test-element');
    const messageId = tooltip.showTooltip('Test message', testElement);

    expect(document.querySelector('.form-error')).not.toBeNull();

    tooltip.removeTooltip(messageId);

    expect(document.querySelector('.form-error')).toBeNull();
  });
});
