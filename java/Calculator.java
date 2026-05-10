import javax.swing.*;
import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

/**
 * A modern, visually appealing Calculator application built with Java Swing.
 * This class demonstrates GUI design principles, event handling, and clean code structure.
 */
public class Calculator extends JFrame implements ActionListener {

    private JTextField display;
    private JPanel buttonPanel;
    
    // State variables
    private double num1 = 0, num2 = 0, result = 0;
    private char operator;

    // Design constants - High Contrast Theme
    private final Color BACKGROUND_COLOR = new Color(24, 24, 24); // Very dark
    private final Color DISPLAY_BACKGROUND = new Color(33, 33, 33);
    private final Color BUTTON_COLOR = new Color(45, 45, 45); // Dark grey
    private final Color OPERATOR_COLOR = new Color(52, 152, 219); // Bright blue
    private final Color ACCENT_COLOR = new Color(230, 126, 34); // Bright orange
    private final Color TEXT_COLOR = Color.WHITE;
    private final Font DISPLAY_FONT = new Font("SansSerif", Font.BOLD, 35);
    private final Font BUTTON_FONT = new Font("SansSerif", Font.BOLD, 22);

    public Calculator() {
        // Initialize the frame
        setTitle("Modern Java Calculator");
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        setSize(400, 600);
        setLayout(new BorderLayout(10, 10));
        getContentPane().setBackground(BACKGROUND_COLOR);

        // Create the display field
        display = new JTextField("0");
        display.setEditable(false);
        display.setHorizontalAlignment(JTextField.RIGHT);
        display.setFont(DISPLAY_FONT);
        display.setBackground(DISPLAY_BACKGROUND);
        display.setForeground(TEXT_COLOR);
        display.setCaretColor(TEXT_COLOR); // In case it's visible
        display.setBorder(BorderFactory.createCompoundBorder(
            BorderFactory.createLineBorder(new Color(60, 60, 60), 1),
            BorderFactory.createEmptyBorder(20, 20, 20, 20)
        ));
        add(display, BorderLayout.NORTH);

        // Create the button panel
        buttonPanel = new JPanel();
        buttonPanel.setLayout(new GridLayout(5, 4, 10, 10));
        buttonPanel.setBackground(BACKGROUND_COLOR);
        buttonPanel.setBorder(BorderFactory.createEmptyBorder(10, 10, 10, 10));

        // Button labels
        String[] buttons = {
            "C", "CE", "%", "/",
            "7", "8", "9", "*",
            "4", "5", "6", "-",
            "1", "2", "3", "+",
            "+/-", "0", ".", "="
        };

        for (String text : buttons) {
            JButton button = createStyledButton(text);
            buttonPanel.add(button);
        }

        add(buttonPanel, BorderLayout.CENTER);

        // Finalize frame
        setLocationRelativeTo(null); // Center on screen
        setVisible(true);
    }

    /**
     * Creates a JButton with custom styling applied.
     */
    private JButton createStyledButton(String text) {
        JButton button = new JButton(text);
        button.setFont(BUTTON_FONT);
        button.setFocusPainted(false);
        button.setForeground(TEXT_COLOR);
        button.setOpaque(true);
        button.setContentAreaFilled(true);
        button.setBorderPainted(false);
        
        // Apply different colors based on button type
        if (text.equals("=") || text.equals("C") || text.equals("CE")) {
            button.setBackground(ACCENT_COLOR);
        } else if ("/*-+".contains(text) || text.equals("%")) {
            button.setBackground(OPERATOR_COLOR); 
        } else {
            button.setBackground(BUTTON_COLOR);
        }

        // Standard padding
        button.setMargin(new Insets(10, 10, 10, 10));
        button.addActionListener(this);
        
        return button;
    }

    @Override
    public void actionPerformed(ActionEvent e) {
        String command = e.getActionCommand();

        if (Character.isDigit(command.charAt(0)) || command.equals(".")) {
            if (display.getText().equals("0")) {
                display.setText(command);
            } else {
                display.setText(display.getText() + command);
            }
        } else if (command.equals("C")) {
            display.setText("0");
            num1 = num2 = result = 0;
            operator = ' ';
        } else if (command.equals("CE")) {
            display.setText("0");
        } else if (command.equals("=")) {
            if (operator != ' ') {
                num2 = Double.parseDouble(display.getText());
                calculate();
                display.setText(formatResult(result));
                num1 = result;
                operator = ' ';
            }
        } else if (command.equals("+/-")) {
            double val = Double.parseDouble(display.getText());
            display.setText(formatResult(val * -1));
        } else {
            // Operator pressed
            if (!display.getText().isEmpty()) {
                num1 = Double.parseDouble(display.getText());
                operator = command.charAt(0);
                display.setText("0");
            }
        }
    }

    private void calculate() {
        switch (operator) {
            case '+': result = num1 + num2; break;
            case '-': result = num1 - num2; break;
            case '*': result = num1 * num2; break;
            case '/': 
                if (num2 != 0) result = num1 / num2;
                else {
                    display.setText("Error");
                    result = 0;
                }
                break;
            case '%': result = num1 % num2; break;
        }
    }

    private String formatResult(double d) {
        if (d == (long) d) return String.format("%d", (long) d);
        else return String.format("%s", d);
    }

    public static void main(String[] args) {
        // Use CrossPlatformLookAndFeel to ensure consistent styling across OS
        try {
            UIManager.setLookAndFeel(UIManager.getCrossPlatformLookAndFeelClassName());
        } catch (Exception ignored) {}

        SwingUtilities.invokeLater(Calculator::new);
    }
}
