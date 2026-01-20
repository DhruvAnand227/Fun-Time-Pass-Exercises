#include <iostream>
using namespace std;

class node {
public:
    string URL;
    node *next;
    node *prev;

    node(string url) {
        this->URL = url;
        this->next = this->prev = nullptr;
    }
    // Destructor hata diya taaki crash na ho
};

class browserHistory {
private:
    node *home;
    node *current;

public:
    browserHistory(string homepage) {
        home = new node(homepage);
        current = home;
    }

    void visit(string url) {
        node *newNode = new node(url);

        // Agar aage koi history hai, toh use delete karna padega (Memory Leak Prevention)
        if (current->next) {
            node *temp = current->next;
            while (temp) {
                node *toDelete = temp;
                temp = temp->next;
                delete toDelete; // Memory free kar di
            }
        }

        // Linking Logic (Simple & Clean)
        current->next = newNode;
        newNode->prev = current;
        current = newNode; // Move pointer to new page
        
        cout << "Visited: " << url << endl;
    }

    void back(int steps) { // Steps add kar diye real feel ke liye
        while(steps > 0 && current->prev) {
            current = current->prev;
            steps--;
        }
        cout << "Current Page: " << current->URL << endl;
    }

    void forward(int steps) {
        while(steps > 0 && current->next) {
            current = current->next;
            steps--;
        }
        cout << "Current Page: " << current->URL << endl;
    }
};

int main() {
    browserHistory b("google.com");
    b.visit("facebook.com");
    b.visit("youtube.com");
    b.back(1); // Facebook
    b.visit("linkedin.com"); // Youtube delete ho jayega, Linkedin add hoga
    b.forward(1); // Kuch nahi hoga, kyunki Linkedin last hai
    return 0;
}
