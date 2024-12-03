public class Main {
        public static void main(String[] args) {
          //write code here
        }import java.util.Scanner;

public class Fibonacci {

    // Function to calculate Fibonacci number using recursion
    public static int fibonacci(int n) {
        if (n <= 1) {
            return n;
        }
        return fibonacci(n - 1) + fibonacci(n - 2);
    }

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        // Taking input from the user
        System.out.print("Enter the number of terms in Fibonacci sequence: ");
        int n = scanner.nextInt();

        System.out.println("Fibonacci sequence up to " + n + " terms:");

        // Print the Fibonacci sequence up to n terms
        for (int i = 0; i < n; i++) {
            System.out.print(fibonacci(i) + " ");
        }
        
        scanner.close();
    }
}

      }